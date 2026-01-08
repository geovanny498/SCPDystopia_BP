// scripts/commands/toggle_system.js
import { system, world, CustomCommandParamType, CustomCommandStatus, CommandPermissionLevel, CustomCommandSource } from "@minecraft/server";
import { saveSystemState, loadSystemState, resetAllSystems } from "./worldSave.js";
import { getTeam } from "../utils/teams.js";
import { debugMessage, debugWarn } from "../utils/debug.js";
import { setAccessors, applySystemToAll, applySystemToEntity } from "./applySystems.js";
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

// flags globales para controlar actualización automática
// Getters para evitar referencias rotas tras /reload
export function getAllSoldiers() { return allSoldiers; }
export function getSpecialSoldiers() { return specialSoldiers; }
export function getSystemStates() { return systemStates; }

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


    // applySystems será el encargado de aplicar los eventos. toggle_system mantiene el estado.

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

            // Delegar la aplicación al core (usar la dimensión del ejecutor si es jugador)
            try {
                const dim = (origin && origin.sourceType === CustomCommandSource.Entity && origin.sourceEntity) ?
                    origin.sourceEntity.dimension :
                    ["overworld", "nether", "the_end"].map(id => world.getDimension(id)).filter(Boolean);
                applySystemToAll(cfg.command, dim);
            } catch (e) { debugWarn("toggle_system", `applySystemToAll error: ${e}`); }

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
    });

    function handleSoldierEntity(ent) {
        if (!ent) return;

        // Validar antes de agregar a allSoldiers
        if (ent.typeId === "minecraft:player") return;
        const name = ent.nameTag ?? "";
        const isSpecialFoundation = specialSoldiers.foundation.includes(name);
        const isSpecialChaos = specialSoldiers.chaos.includes(name);
        const team = getTeam(ent);
        if (!isSpecialFoundation && !isSpecialChaos && team !== "foundation" && team !== "chaos") return;

        if (!allSoldiers.includes(ent.id)) allSoldiers.push(ent.id);
        // Reaplicar todos los sistemas vigentes a la entidad nueva
        for (const sysName of Object.keys(systemStates)) {
            try { applySystemToEntity(sysName, ent); } catch (e) { }
        }
    }


    // ============================================================================
    // DESACTIVADO: Los event listeners ahora se manejan en menu_events.js
    // que respeta las reglas de applyMode (existing_only vs all)
    // ============================================================================

    // Centralizar reaplicación: cuando una entidad aparece o se carga, actualizar lista y delegar en applySystemToEntity
    // world.afterEvents.entitySpawn.subscribe(ev => {
    //     handleSoldierEntity(ev.entity);
    // });

    // world.afterEvents.entityLoad.subscribe(ev => {
    //     handleSoldierEntity(ev.entity);
    // });

    // world.afterEvents.entityRemove.subscribe(ev => {
    //     const idx = allSoldiers.indexOf(ev.removedEntityId);
    //     if (idx !== -1) allSoldiers.splice(idx, 1);
    // });

    // Inyectar accesores en applySystems para que use las estructuras mantenidas aquí (evita ciclos de import)
    try {
        setAccessors({ getAllSoldiers, getSpecialSoldiers, getSystemStates });
    } catch (e) { /* no bloquear */ }
}
