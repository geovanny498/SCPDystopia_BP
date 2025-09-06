// scripts/commands/toggle_teleport.js
import { system, world, CustomCommandParamType, CustomCommandStatus, CommandPermissionLevel } from "@minecraft/server";
import { saveSystemState, loadSystemState } from "./worldSave.js";
import { allSoldiers, specialSoldiers, systemStates } from "./toggle_system.js";


system.beforeEvents.startup.subscribe((init) => {
    try {
        // Enum para mode
        init.customCommandRegistry.registerEnum("scpd:mode", ["normal", "near", "false"]);

        // Enum para includeSpecialT
        init.customCommandRegistry.registerEnum("scpd:includeSpecialT", ["normal", "near", "false"]);
    } catch { }
});


export function registerTeleportSystem(cfg) {
    // Asegurar estado
    if (!systemStates.teleport) {
        systemStates.teleport = {
            foundation: { mode: "false", includeSpecial: "false" },
            chaos: { mode: "false", includeSpecial: "false" },
        };
    }

    // Cargar estado guardado
    system.run(() => {
        const loaded = loadSystemState("teleport");
        if (loaded) systemStates.teleport = loaded;
    });

    function safeTriggerEvent(ent, eventName) {
        if (!ent || !eventName) return;
        try { ent.triggerEvent(eventName); }
        catch (err) {
            // console.warn(`[SCPDystopia] No se pudo aplicar evento "${eventName}" a ${ent.nameTag}: ${err}`);
        }
    }

    function applyTeleport(ent) {
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

        // No aplicar si no es especial ni pertenece a la facción
        if (!isFoundation && !isChaos && !isSpecialFoundation && !isSpecialChaos) return;

        const state = systemStates.teleport;
        const factions = [
            { config: state.foundation, active: isFoundation, isSpecial: isSpecialFoundation },
            { config: state.chaos, active: isChaos, isSpecial: isSpecialChaos },
        ];

        for (const { config, active, isSpecial } of factions) {
            if (isSpecial) {
                const specialsEnabled = !(config.includeSpecial === "false" || config.includeSpecial === false);
                if (specialsEnabled) {
                    if (config.includeSpecial === "near") {
                        safeTriggerEvent(ent, cfg.events.stop);
                        safeTriggerEvent(ent, cfg.events.start_near);
                    } else {
                        safeTriggerEvent(ent, cfg.events.stop_near);
                        safeTriggerEvent(ent, cfg.events.start);
                    }
                } else {
                    safeTriggerEvent(ent, cfg.events.stop_near);
                    safeTriggerEvent(ent, cfg.events.stop);
                }
            } else if (active) {
                const mode = config.mode ?? "false";
                if (mode === "near") {
                    safeTriggerEvent(ent, cfg.events.stop);
                    safeTriggerEvent(ent, cfg.events.start_near);
                } else if (mode === "normal") {
                    safeTriggerEvent(ent, cfg.events.stop_near);
                    safeTriggerEvent(ent, cfg.events.start);
                } else {
                    safeTriggerEvent(ent, cfg.events.stop_near);
                    safeTriggerEvent(ent, cfg.events.stop);
                }
            }
        }
    }


    // Registrar comandos
    system.beforeEvents.startup.subscribe((init) => {
        const toggleCommand = {
            name: `scpd:toggle_${cfg.command}`,
            description: cfg.desc,
            permissionLevel: CommandPermissionLevel.Any,
            cheatsRequired: false,
            optionalParameters: [
                { name: "scpd:faction", type: CustomCommandParamType.Enum }, // foundation | chaos | both
                {
                    name: "scpd:mode",
                    type: CustomCommandParamType.Enum,
                },
                {
                    name: "scpd:includeSpecialT",
                    type: CustomCommandParamType.Enum,
                },
            ],
        };

        init.customCommandRegistry.registerCommand(toggleCommand, (origin, faction, mode, includeSpecialT) => {
            faction = faction ?? "both";
            mode = mode ?? "normal";
            const includeSpecial = includeSpecialT ?? "false";

            const state = systemStates.teleport;
            if (faction === "foundation" || faction === "both") {
                state.foundation.mode = mode;
                state.foundation.includeSpecial = includeSpecial;
            }
            if (faction === "chaos" || faction === "both") {
                state.chaos.mode = mode;
                state.chaos.includeSpecial = includeSpecial;
            }

            saveSystemState("teleport", state);

            allSoldiers.forEach(id => {
                const ent = world.getEntity(id);
                if (ent) applyTeleport(ent);
            });

            return {
                status: CustomCommandStatus.Success,
                message: `Teleport para ${faction} actualizado: mode=${mode}, especiales=${includeSpecial}`
            };
        });

        // Status
        const statusCommand = {
            name: `scpd:${cfg.statusCommand}`,
            description: `Muestra estado actual del teleport`,
            permissionLevel: CommandPermissionLevel.Any,
            cheatsRequired: false,
            optionalParameters: [{ name: "scpd:faction", type: CustomCommandParamType.Enum }]
        };

        init.customCommandRegistry.registerCommand(statusCommand, (origin, faction) => {
            faction = faction ?? "both";
            const state = systemStates.teleport;

            function formatFaction(name, data) {
                const modeText = data.mode === "false" ? "§c[OFF]§r" : `§a[${data.mode}]§r`;
                const specialText = data.includeSpecial === "false" ? "§c[OFF]§r" : `§a[${data.includeSpecial}]§r`;
                return `§l${name.toUpperCase()}§r\n Modo: ${modeText}\n Especiales: ${specialText}`;
            }

            const parts = [];
            if (faction === "foundation" || faction === "both") parts.push(formatFaction("Foundation", state.foundation));
            if (faction === "chaos" || faction === "both") parts.push(formatFaction("Chaos", state.chaos));

            return { status: CustomCommandStatus.Success, message: `§6Teleport - Estado Actual§r\n\n${parts.join("\n\n")}` };
        });
    });


    // Listeners
    function handleEntity(ent) {
        if (!ent) return;
        if (!allSoldiers.includes(ent.id)) allSoldiers.push(ent.id);
        applyTeleport(ent);
    }

    world.afterEvents.entitySpawn.subscribe(ev => handleEntity(ev.entity));
    world.afterEvents.entityLoad.subscribe(ev => handleEntity(ev.entity));
    world.afterEvents.entityRemove.subscribe(ev => {
        const idx = allSoldiers.indexOf(ev.removedEntityId);
        if (idx !== -1) allSoldiers.splice(idx, 1);
    });
}
