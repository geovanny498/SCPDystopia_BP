// scripts/commands/toggle_teleport.js
import { system, world, CustomCommandParamType, CustomCommandStatus, CommandPermissionLevel } from "@minecraft/server";
import { saveSystemState, loadSystemState } from "./worldSave.js";
import { allSoldiers, specialSoldiers, systemStates, autoUpdateFlags } from "./toggle_system.js";
import { getTeam } from "../utils/teams.js";
import { debugMessage, debugWarn } from "../utils/debug.js";

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
        // Reaplicar temporalmente para todas las entidades existentes
        system.runInterval(() => {
            if (!autoUpdateFlags.teleport) return; // solo si está habilitado
            allSoldiers.forEach(id => {
                const ent = world.getEntity(id);
                if (ent) {
                    handleEntity(ent);
                }
            });
            debugWarn(`toggle_${cfg.command}`, `runInterval Se volvió a ejecutar`, "green");
        }, 20 * 30); // cada 600 ticks
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
        const state = systemStates.teleport;

        debugMessage("toggle_teleport", `Revisando entidad: ${ent.typeId}, nameTag="${ent.nameTag}"`);

        // Si ya tiene el componente de teleport, no repetir
        if (cfg.component) {
            debugMessage("toggle_teleport", `Componente esperado: ${cfg.component}`);
            try {
                if (ent.hasComponent(cfg.component)) {
                    debugMessage("toggle_teleport", `Ya tiene el componente ${cfg.component}, no se reaplica evento`);
                    return;
                } else {
                    debugMessage("toggle_teleport", `No tiene el componente ${cfg.component}, se aplicará evento`);
                }
            } catch (e) {
                debugWarn("toggle_teleport", `Error al verificar componente ${cfg.component}: ${e}`);
            }
        }

        // Si es especial, prioridad sobre equipo/familia
        if (isSpecialFoundation || isSpecialChaos) {
            const factions = [
                { config: state.foundation, isSpecial: isSpecialFoundation, label: "Foundation especial" },
                { config: state.chaos, isSpecial: isSpecialChaos, label: "Chaos especial" },
            ];

            for (const { config, isSpecial, label } of factions) {
                if (isSpecial) {
                    const specialsEnabled = !(config.includeSpecial === "false" || config.includeSpecial === false);
                    if (specialsEnabled) {
                        if (config.includeSpecial === "near") {
                            debugMessage("toggle_teleport", `${label} → modo NEAR`);
                            safeTriggerEvent(ent, cfg.events.stop);
                            safeTriggerEvent(ent, cfg.events.start_near);
                        } else {
                            debugMessage("toggle_teleport", `${label} → modo NORMAL`);
                            safeTriggerEvent(ent, cfg.events.stop_near);
                            safeTriggerEvent(ent, cfg.events.start);
                        }
                    } else {
                        debugMessage("toggle_teleport", `${label} → deshabilitado`);
                        safeTriggerEvent(ent, cfg.events.stop_near);
                        safeTriggerEvent(ent, cfg.events.stop);
                    }
                }
            }
            return;
        }

        // No es especial → usar getTeam
        const team = getTeam(ent);
        if (!team) {
            debugMessage("toggle_teleport", `No se detectó team en entidad ${ent.nameTag}`);
            return;
        }

        const config = state[team];
        const mode = config.mode ?? "false";

        if (mode === "near") {
            debugMessage("toggle_teleport", `${team} normal → modo NEAR`);
            safeTriggerEvent(ent, cfg.events.stop);
            safeTriggerEvent(ent, cfg.events.start_near);
        } else if (mode === "normal") {
            debugMessage("toggle_teleport", `${team} normal → modo NORMAL`);
            safeTriggerEvent(ent, cfg.events.stop_near);
            safeTriggerEvent(ent, cfg.events.start);
        } else {
            debugMessage("toggle_teleport", `${team} normal → deshabilitado`);
            safeTriggerEvent(ent, cfg.events.stop_near);
            safeTriggerEvent(ent, cfg.events.stop);
        }
    }


    function handleEntity(ent) {
        try {
            if (!ent) return;

            const isSpecialFoundation = specialSoldiers.foundation.includes(ent.nameTag);
            const isSpecialChaos = specialSoldiers.chaos.includes(ent.nameTag);

            // Determinar equipo usando getTeam si no es especial
            const team = isSpecialFoundation
                ? "foundation"
                : isSpecialChaos
                    ? "chaos"
                    : getTeam(ent);

            // Si no es especial ni pertenece a ningún equipo, no aplicar
            if (!team && !isSpecialFoundation && !isSpecialChaos) return;

            if (!allSoldiers.includes(ent.id)) allSoldiers.push(ent.id);

            applyTeleport(ent); // aplicar teleport con la lógica nueva
            debugWarn(`toggle_entity`, `Entidad existente actualizada: ${ent.typeId}`);
        } catch (error) {
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

    world.afterEvents.entitySpawn.subscribe(ev => handleEntity(ev.entity));
    world.afterEvents.entityLoad.subscribe(ev => handleEntity(ev.entity));
    world.afterEvents.entityRemove.subscribe(ev => {
        const idx = allSoldiers.indexOf(ev.removedEntityId);
        if (idx !== -1) allSoldiers.splice(idx, 1);
    });
}
