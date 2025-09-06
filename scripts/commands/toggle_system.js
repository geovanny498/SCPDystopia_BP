// scripts/commands/toggle_system.js
import { system, world, CustomCommandParamType, CustomCommandStatus, CommandPermissionLevel } from "@minecraft/server";
import { saveSystemState, loadSystemState, resetAllSystems } from "./worldSave.js";

// Soldados especiales
export const specialSoldiers = {
    foundation: [
        "§c§lMTF Delta-1 Chara", "§d§lMTF Delta-1 Frisk", "§d§lMTF Delta-1 Commander",
        "§d§lMTF Delta-1 Mita", "§d§lMTF Delta-1 Leader", "§lMTF Alpha-1 Commander",
        "§lMTF Alpha-1 Commander 2", "§lMTF Alpha-1 Commander 3", "§1§lMTF Epsilon-11 Commander",
        "§b§lMTF Eta-10 Commander", "§8§lMTF Nu-7 Commander", "§6§lMTF Beta-7 Commander",
        "§e§lMTF Epsilon-6 Commander",
    ],
    chaos: [
        "§2§lChaos Delta Commander", "§a§lChaos Delta Leader 1", "§a§lChaos Delta Leader 2",
        "§a§lChaos Delta Leader 3", "§a§lChaos Delta Leader 4",
    ],
};

// Lista global de soldados
export const allSoldiers = [];

// Estados internos globales de los sistemas
export const systemStates = {
    health: { foundation: { enable: false, includeSpecial: false }, chaos: { enable: false, includeSpecial: false } },
    spawn: { foundation: { enable: false, includeSpecial: false }, chaos: { enable: false, includeSpecial: false } },
    teleport: { foundation: { mode: "false", includeSpecial: "false" }, chaos: { mode: "false", includeSpecial: "false" } }
};

// Registrar enum de facciones
system.beforeEvents.startup.subscribe((init) => {
    try { init.customCommandRegistry.registerEnum("scpd:faction", ["foundation", "chaos", "both"]); }
    catch { }
});

/**
 * Registrar sistema genérico
 * @param {Object} cfg
 */
export function registerSoldierSystem(cfg) {
    if (!systemStates[cfg.command]) {
        systemStates[cfg.command] = {
            foundation: { enable: false, includeSpecial: false },
            chaos: { enable: false, includeSpecial: false }
        };
    }

    system.run(() => {
        const loaded = loadSystemState(cfg.command);
        if (loaded) systemStates[cfg.command] = loaded;
    });

    function safeTriggerEvent(ent, eventName) {
        if (!ent || !eventName) return;
        try { ent.triggerEvent(eventName); }
        catch (err) {
            // console.warn(`[SCPDystopia] No se pudo aplicar evento "${eventName}" a ${ent.nameTag}: ${err}`);
        }
    }

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
        } catch { }

        // Solo aplicar si pertenece a facción o es especial
        if (!isFoundation && !isChaos && !isSpecialFoundation && !isSpecialChaos) return;

        const state = systemStates[cfg.command];
        const factions = [
            { config: state.foundation, active: isFoundation, name: "foundation", isSpecial: isSpecialFoundation },
            { config: state.chaos, active: isChaos, name: "chaos", isSpecial: isSpecialChaos },
        ];

        for (const { config, active, isSpecial } of factions) {
            if (isSpecial) {
                if (config.includeSpecial) safeTriggerEvent(ent, cfg.startEvent);
                else safeTriggerEvent(ent, cfg.stopEvent);
            } else if (active) {
                if (config.enable) safeTriggerEvent(ent, cfg.startEvent);
                else safeTriggerEvent(ent, cfg.stopEvent);
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
                { name: "enable", type: CustomCommandParamType.Boolean },
                { name: "includeSpecial", type: CustomCommandParamType.Boolean },
            ],
        };

        init.customCommandRegistry.registerCommand(toggleCommand, (origin, faction, enable, includeSpecial) => {
            faction = faction ?? "both"; enable = enable ?? true; includeSpecial = includeSpecial ?? false;
            const state = systemStates[cfg.command];

            if (faction === "foundation" || faction === "both") {
                state.foundation.enable = enable;
                state.foundation.includeSpecial = includeSpecial;
            }
            if (faction === "chaos" || faction === "both") {
                state.chaos.enable = enable;
                state.chaos.includeSpecial = includeSpecial;
            }

            saveSystemState(cfg.command, state);

            allSoldiers.forEach(id => {
                const ent = world.getEntity(id);
                if (ent) applyToEntity(ent);
            });

            return {
                status: CustomCommandStatus.Success,
                message: enable
                    ? `${cfg.labelOn} para ${faction} (especiales: ${includeSpecial})`
                    : `${cfg.labelOff} para ${faction} (especiales: ${includeSpecial})`,
            };
        });

        // --- Comando status ---
        const statusCommand = {
            name: `scpd:${cfg.statusCommand}`,
            description: `Muestra la configuración actual de ${cfg.command}`,
            permissionLevel: CommandPermissionLevel.Any,
            cheatsRequired: false,
            optionalParameters: [{ name: "scpd:faction", type: CustomCommandParamType.Enum }],
        };

        init.customCommandRegistry.registerCommand(statusCommand, (origin, faction) => {
            faction = faction ?? "both";
            const state = systemStates[cfg.command];

            function formatState(name, state, specials, isTeleport = false) {
                if (isTeleport) {
                    const mode = state.mode === "false" ? "§c[OFF]§r" : `§a[${state.mode.toUpperCase()}]§r`;
                    const specialText = state.includeSpecial === "false" ? "§c[OFF]§r" : `§a[${state.includeSpecial.toUpperCase()}]§r`;
                    return `§r§l${name.toUpperCase()}§r\n Modo: ${mode}\n Especiales: ${specialText}`;
                } else {
                    const enabled = state.enable ? "§a[ON]§r" : "§c[OFF]§r";
                    const specialText = state.includeSpecial ? `§aEspeciales [ON]§r\n   ${specials.join("§r\n   ")}` : "§cEspeciales [OFF]§r";
                    return `§r§l${name.toUpperCase()}§r\n Estado: ${enabled}\n ${specialText}`;
                }
            }

            const parts = [];
            if (faction === "foundation" || faction === "both") parts.push(formatState("Foundation", state.foundation, specialSoldiers.foundation, cfg.command === "teleport"));
            if (faction === "chaos" || faction === "both") parts.push(formatState("Chaos", state.chaos, specialSoldiers.chaos, cfg.command === "teleport"));

            return { status: CustomCommandStatus.Success, message: `§6${cfg.desc} - Estado Actual§r\n\n${parts.join("\n\n")}` };
        });

        // --- Comando reset ---
        try {
            init.customCommandRegistry.registerCommand({
                name: "scpd:reset_system",
                description: "Resetea un sistema específico o todos",
                permissionLevel: CommandPermissionLevel.Any,
                cheatsRequired: false
            }, (origin, system_name) => {
                resetAllSystems(systemStates);
                return { status: CustomCommandStatus.Success, message: system_name ? `${system_name} reseteado` : "Todos los sistemas reseteados" };
            });
        } catch { }
    });

    // --- Listeners para aplicar automáticamente ---
    function handleEntity(ent) {
        if (!ent) return;

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
