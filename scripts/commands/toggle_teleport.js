// scripts/commands/toggle_teleport.js
import { system, world, CustomCommandParamType, CustomCommandStatus, CommandPermissionLevel } from "@minecraft/server";
import { saveSystemState, loadSystemState } from "./worldSave.js";
import { allSoldiers, specialSoldiers, systemStates } from "./toggle_system.js";

// Registrar enums para modo de teleport
system.beforeEvents.startup.subscribe((init) => {
    try {
        init.customCommandRegistry.registerEnum("normalMode", ["normal", "near", "false"]);
        init.customCommandRegistry.registerEnum("specialMode", ["normal", "near", "false"]);
    } catch {}
});

/**
 * Registrar sistema de teleport
 */
export function registerTeleportSystem(cfg) {
    // Cargar estado
    system.run(() => {
        const loaded = loadSystemState(cfg.name);
        if (loaded) systemStates[cfg.name] = loaded;
    });

    // Aplica teleport a un soldado
    function applyToEntity(ent) {
        if (!ent) return;

        const isSpecialFoundation = specialSoldiers.foundation.includes(ent.nameTag);
        const isSpecialChaos = specialSoldiers.chaos.includes(ent.nameTag);

        let isFoundation = false, isChaos = false;
        try {
            const familyComp = ent.getComponent("minecraft:type_family");
            if (familyComp) {
                isFoundation = familyComp.hasTypeFamily("foundation");
                isChaos = familyComp.hasTypeFamily("chaos_insurgency");
            }
        } catch {}

        const state = systemStates[cfg.name];
        const factions = [
            { config: state.foundation, active: isFoundation, isSpecial: isSpecialFoundation },
            { config: state.chaos, active: isChaos, isSpecial: isSpecialChaos },
        ];

        for (const { config, active, isSpecial } of factions) {
            let modeToUse = isSpecial ? config.includeSpecial : config.mode;
            if (modeToUse === "false") continue;

            const eventName = modeToUse === "normal"
                ? cfg.normalEvent
                : modeToUse === "near"
                ? cfg.nearEvent
                : null;

            if (eventName) {
                try { ent.triggerEvent(eventName); } catch {}
            }
        }
    }

    // --- Comando toggle ---
    system.beforeEvents.startup.subscribe((init) => {
        const toggleCommand = {
            name: `scpd:toggle_${cfg.command}`,
            description: cfg.desc,
            permissionLevel: CommandPermissionLevel.Any,
            cheatsRequired: false,
            optionalParameters: [
                { name: "scpd:faction", type: CustomCommandParamType.Enum },
                { name: "normalMode", type: CustomCommandParamType.Enum },
                { name: "specialMode", type: CustomCommandParamType.Enum },
            ],
        };

        init.customCommandRegistry.registerCommand(toggleCommand, (origin, faction, mode, includeSpecial) => {
            faction = faction ?? "both";
            mode = mode ?? "normal";
            includeSpecial = includeSpecial ?? "false";

            const state = systemStates[cfg.name];

            if (faction === "foundation" || faction === "both") {
                state.foundation.mode = mode;
                state.foundation.includeSpecial = includeSpecial;
            }
            if (faction === "chaos" || faction === "both") {
                state.chaos.mode = mode;
                state.chaos.includeSpecial = includeSpecial;
            }

            saveSystemState(cfg.name, state);

            allSoldiers.forEach(id => {
                const ent = world.getEntity(id);
                if (ent) applyToEntity(ent);
            });

            const msg = `[SCPDystopia] Teleport actualizado:\nFoundation: mode=${state.foundation.mode}, includeSpecial=${state.foundation.includeSpecial}\nChaos: mode=${state.chaos.mode}, includeSpecial=${state.chaos.includeSpecial}`;
            world.sendMessage(msg);
            return { status: CustomCommandStatus.Success, message: msg };
        });

        // --- Comando status ---
        const statusCommand = {
            name: `scpd:status_${cfg.command}`,
            description: `Muestra la configuración actual de ${cfg.command}`,
            permissionLevel: CommandPermissionLevel.Any,
            cheatsRequired: false,
            optionalParameters: [{ name: "scpd:faction", type: CustomCommandParamType.Enum }],
        };

        init.customCommandRegistry.registerCommand(statusCommand, (origin, faction) => {
            faction = faction ?? "both";
            const state = systemStates[cfg.name];

            function formatState(name, data) {
                const mode = data.mode === "false" ? "§c[OFF]§r" : `§a[${data.mode.toUpperCase()}]§r`;
                const special = data.includeSpecial === "false" ? "§c[OFF]§r" : `§a[${data.includeSpecial.toUpperCase()}]§r`;
                return `§l${name.toUpperCase()}§r\n Modo: ${mode}\n Especiales: ${special}`;
            }

            const parts = [];
            if (faction === "foundation" || faction === "both") parts.push(formatState("Foundation", state.foundation));
            if (faction === "chaos" || faction === "both") parts.push(formatState("Chaos", state.chaos));

            return {
                status: CustomCommandStatus.Success,
                message: `§6${cfg.desc} - Estado Actual§r\n\n${parts.join("\n\n")}`
            };
        });

        // --- Comando check_world_props ---
        try {
            init.customCommandRegistry.registerCommand({
                name: "scpd:check_world_props",
                description: "Muestra las propiedades dinámicas del mundo de forma legible",
                permissionLevel: CommandPermissionLevel.Any,
                cheatsRequired: false,
            }, (origin) => {
                const healthState = JSON.parse(world.getDynamicProperty("scpd_system_show_health") ?? "{}");
                const spawnState = JSON.parse(world.getDynamicProperty("scpd_system_spawn_soldiers") ?? "{}");
                const teleportState = JSON.parse(world.getDynamicProperty("scpd_system_teleport") ?? "{}");

                function formatSystem(name, state) {
                    if (!state || !state.foundation || !state.chaos) return `§7${name}: No definido§r`;

                    function formatFaction(factionName, data) {
                        if (name === "Teleport") {
                            const mode = data.mode === "false" ? "§c[OFF]§r" : `§a[${data.mode.toUpperCase()}]§r`;
                            const special = data.includeSpecial === "false" ? "§c[OFF]§r" : `§a[${data.includeSpecial.toUpperCase()}]§r`;
                            return `§l${factionName.toUpperCase()}§r\n Modo: ${mode}\n Especiales: ${special}`;
                        } else {
                            const enabled = data.enable ? "§a[ON]§r" : "§c[OFF]§r";
                            const special = data.includeSpecial ? "§a[ON]§r" : "§c[OFF]§r";
                            return `§l${factionName.toUpperCase()}§r\n Estado: ${enabled}\n Especiales: ${special}`;
                        }
                    }

                    return `§6§l${name}§r\n${formatFaction("Foundation", state.foundation)}\n\n${formatFaction("Chaos", state.chaos)}`;
                }

                const message = `§e§l[SCPDystopia] Propiedades del mundo§r\n\n${formatSystem("Health", healthState)}\n\n${formatSystem("Spawn", spawnState)}\n\n${formatSystem("Teleport", teleportState)}`;
                console.log(message);
                world.sendMessage(message);

                return { status: CustomCommandStatus.Success, message: "Propiedades mostradas en consola y chat" };
            });
        } catch {}
    });

    // Listeners para aplicar a nuevos soldados
    function handleEntity(ent) {
        const state = systemStates[cfg.name];
        if (!allSoldiers.includes(ent.id)) allSoldiers.push(ent.id);
        applyToEntity(ent);
    }

    world.afterEvents.entitySpawn.subscribe(ev => handleEntity(ev.entity));
    world.afterEvents.entityLoad.subscribe(ev => handleEntity(ev.entity));
    world.afterEvents.entityRemove.subscribe(ev => {
        const idx = allSoldiers.indexOf(ev.removedEntityId);
        if (idx !== -1) allSoldiers.splice(idx, 1);
    });
}
