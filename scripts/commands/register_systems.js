// commands/register_systems.js
import { registerSoldierSystem } from "./toggle_system.js";
import { registerTeleportSystem } from "./toggle_teleport.js";
import { system, world, CustomCommandParamType, CustomCommandStatus, CommandPermissionLevel } from "@minecraft/server";
import { systemStates, autoUpdateFlags } from "./toggle_system.js";

// Sistema de spawn
registerSoldierSystem({
    name: "spawn",
    command: "spawn",
    statusCommand: "status_spawn",
    desc: "Activa o desactiva el spawn de soldados",
    component: "minecraft:behavior.summon_entity",
    startEvent: "humanoid:start_spawn_soldiers",
    stopEvent: "humanoid:stop_spawn_soldiers",
    labelOn: "Spawn activado",
    labelOff: "Spawn desactivado",
});

// Sistema de barra de vida
registerSoldierSystem({
    name: "health",
    command: "health",
    statusCommand: "status_health",
    desc: "Activa o desactiva la barra de vida de los soldados",
    component: "minecraft:boss",
    startEvent: "humanoid:show_boss_bar",
    stopEvent: "humanoid:dont_show_boss_bar",
    labelOn: "Barra de vida activada",
    labelOff: "Barra de vida desactivada",
});

// Sistema de teleport
registerTeleportSystem({
    name: "teleport",
    command: "teleport",
    statusCommand: "status_teleport",
    desc: "Controla el teleport de soldados",
    component: "minecraft:teleport",
    events: {
        start: "humanoid:start_teleport",
        stop: "humanoid:stop_teleport",
        start_near: "humanoid:start_teleport_near",
        stop_near: "humanoid:stop_teleport_near",
    }
});

system.beforeEvents.startup.subscribe((init) => {
    const toggleAllAutoUpdate = {
        name: "scpd:toggle_all_auto_update",
        description: "Activa o desactiva la actualización automática de soldados y teleport",
        permissionLevel: CommandPermissionLevel.Any,
        cheatsRequired: false,
        optionalParameters: [
            { name: "enable", type: CustomCommandParamType.Boolean }
        ],
    };

    init.customCommandRegistry.registerCommand(toggleAllAutoUpdate, (origin, enable) => {
        // Por defecto false si no se pasa nada
        const state = enable ?? false;

        autoUpdateFlags.system = state;
        autoUpdateFlags.teleport = state;
        if (enable) {
            console.log("Actualización automática de soldados y teleport activada")
        } else {
            console.log("Actualización automática de soldados y teleport desactivada")
        }

        return {
            status: CustomCommandStatus.Success,
            message: state
                ? "Actualización automática de soldados y teleport activada"
                : "Actualización automática de soldados y teleport desactivada"
        };
    });
});



system.beforeEvents.startup.subscribe((init) => {
    const setCmd = {
        name: "scpd:set_world_props",
        description: "Configura automáticamente las propiedades de SCPDystopia y actualiza systemStates",
        permissionLevel: CommandPermissionLevel.Any,
        cheatsRequired: false,
    };

    try {
        init.customCommandRegistry.registerCommand(setCmd, (origin) => {
            const defaultConfigs = {
                health: {
                    foundation: { enable: true, includeSpecial: false },
                    chaos: { enable: true, includeSpecial: true },
                },
                spawn: {
                    foundation: { enable: true, includeSpecial: false },
                    chaos: { enable: true, includeSpecial: true },
                },
                teleport: {
                    foundation: { mode: "normal", includeSpecial: "false" },
                    chaos: { mode: "normal", includeSpecial: "normal" },
                }
            };

            // Guardar en world properties y actualizar systemStates
            for (const [systemName, cfg] of Object.entries(defaultConfigs)) {
                const id = `scpd_system_${systemName}`;
                world.setDynamicProperty(id, JSON.stringify(cfg));

                // Actualizar systemStates si existe
                if (systemName === "teleport") {
                    if (!systemStates.teleport) systemStates.teleport = {};
                    systemStates.teleport.foundation = { ...cfg.foundation };
                    systemStates.teleport.chaos = { ...cfg.chaos };
                } else {
                    if (!systemStates[systemName]) systemStates[systemName] = {};
                    systemStates[systemName].foundation = { ...cfg.foundation };
                    systemStates[systemName].chaos = { ...cfg.chaos };
                }
            }

            // console.log("[SCPDystopia] Propiedades dinámicas configuradas automáticamente:", Object.keys(defaultConfigs).join(", "));

            // Retornar respuesta
            return {
                status: CustomCommandStatus.Success,
                message: "Propiedades de SCPDystopia aplicadas automáticamente y systemStates actualizados"
            };
        });
    } catch (e) {
        console.warn("Error registrando scpd:set_world_props:", e);
    }
});


// --- Comando check ---
system.beforeEvents.startup.subscribe((init) => {
    const checkCmd = {
        name: "scpd:check_world_props",
        description: "Muestra todas las propiedades dinámicas del mundo de forma legible",
        permissionLevel: CommandPermissionLevel.Any,
        cheatsRequired: false,
    };

    try {
        init.customCommandRegistry.registerCommand(checkCmd, (origin) => {
            const ids = world.getDynamicPropertyIds();

            // Log en consola de TODAS las propiedades dinámicas
            console.log(`[SCPDystopia] Propiedades dinámicas encontradas: ${ids.length > 0 ? ids.join(", ") : "ninguna"}`);

            const scpdProps = ids.filter(id => id.startsWith("scpd_system_"));

            if (scpdProps.length === 0) {
                return {
                    status: CustomCommandStatus.Success,
                    message: "§7No hay propiedades SCPDystopia definidas en este mundo.§r"
                };
            }

            function formatSystem(name, state, isTeleport = false) {
                if (!state || !state.foundation || !state.chaos)
                    return `§7${name}: No definido§r`;

                function formatFaction(factionName, data) {
                    if (isTeleport) {
                        const normalMode = data.mode === "false" ? "§c[OFF]§r" : `§a[${data.mode}]§r`;
                        const specialMode = data.includeSpecial === "false" ? "§c[OFF]§r" : `§a[${data.includeSpecial}]§r`;
                        return `§l${factionName.toUpperCase()}§r\n Normales: ${normalMode}\n Especiales: ${specialMode}`;
                    } else {
                        const enabled = data.enable ? "§a[ON]§r" : "§c[OFF]§r";
                        const specials = data.includeSpecial ? "§a[ON]§r" : "§c[OFF]§r";
                        return `§l${factionName.toUpperCase()}§r\n Estado: ${enabled}\n Especiales: ${specials}`;
                    }
                }

                return `§6§l${name}§r\n${formatFaction("Foundation", state.foundation)}\n\n${formatFaction("Chaos", state.chaos)}`;
            }

            let message = `§e§l[SCPDystopia] Propiedades del mundo§r\n\n`;

            for (const id of scpdProps) {
                const raw = world.getDynamicProperty(id);
                let state;
                try {
                    state = JSON.parse(raw ?? "{}");
                } catch {
                    state = {};
                }

                // Nombre legible: scpd_system_show_health -> Show Health
                const sysName = id.replace("scpd_system_", "");
                const prettyName = sysName
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, c => c.toUpperCase());

                const isTeleport = sysName.includes("teleport");
                message += `${formatSystem(prettyName, state, isTeleport)}\n\n`;
            }

            console.log(message);
            world.sendMessage(message);

            return {
                status: CustomCommandStatus.Success,
                message: "Propiedades mostradas en consola y chat"
            };
        });
    } catch { }
});
