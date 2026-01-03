// scripts/commands/applySystems.js
import { world } from "@minecraft/server";
import { debugMessage, debugWarn } from "../utils/debug.js";
import { getTeam } from "../utils/teams.js";

const EVENTS_BY_SYSTEM = {
    spawn: { start: "humanoid:start_spawn_soldiers", stop: "humanoid:stop_spawn_soldiers" },
    health: { start: "humanoid:show_boss_bar", stop: "humanoid:dont_show_boss_bar" },
    teleport: {
        start: "humanoid:start_teleport",
        stop: "humanoid:stop_teleport",
        start_near: "humanoid:start_teleport_near",
        stop_near: "humanoid:stop_teleport_near",
    },
};

// Accesores externos (inyectados por toggle_system.js para evitar ciclos)
let accessors = {
    getAllSoldiers: null,
    getSpecialSoldiers: null,
    getSystemStates: null,
};

export function setAccessors(obj) {
    accessors = { ...accessors, ...(obj || {}) };
}

function safeTriggerEvent(ent, ev) {
    if (!ent || !ev) return;
    try { ent.triggerEvent(ev); }
    catch (e) { /* no romper */ }
}

function isValidSoldier(ent) {
    if (!ent) return false;
    if (ent.typeId === "minecraft:player") return false;

    const specials = accessors.getSpecialSoldiers ? accessors.getSpecialSoldiers() : null;
    const name = ent.nameTag ?? "";

    if (specials) {
        if (specials.foundation?.includes(name)) return true;
        if (specials.chaos?.includes(name)) return true;
    }

    const team = getTeam(ent);
    return team === "foundation" || team === "chaos";
}

export function applySystemToEntity(systemName, ent) {
    try {
        if (!ent) return;
        if (!isValidSoldier(ent)) return;

        const systemStates = accessors.getSystemStates ? accessors.getSystemStates() : {};
        const state = systemStates[systemName];
        if (!state) return;

        const specials = accessors.getSpecialSoldiers ? accessors.getSpecialSoldiers() : { foundation: [], chaos: [] };
        const name = ent.nameTag ?? "";
        const isSpecialFoundation = specials.foundation?.includes(name);
        const isSpecialChaos = specials.chaos?.includes(name);

        // Teleport (modo con opciones)
        if (systemName === "teleport") {
            const events = EVENTS_BY_SYSTEM.teleport;
            // especiales
            if (isSpecialFoundation || isSpecialChaos) {
                if (isSpecialFoundation) {
                    const cfg = state.foundation;
                    const include = cfg?.includeSpecial ?? "false";
                    if (include === "near") {
                        safeTriggerEvent(ent, events.stop);
                        safeTriggerEvent(ent, events.start_near);
                    } else if (include && include !== "false") {
                        safeTriggerEvent(ent, events.stop);
                        safeTriggerEvent(ent, events.start);
                    } else {
                        safeTriggerEvent(ent, events.stop);
                    }
                    return;
                }
                if (isSpecialChaos) {
                    const cfg = state.chaos;
                    const include = cfg?.includeSpecial ?? "false";
                    if (include === "near") {
                        safeTriggerEvent(ent, events.stop);
                        safeTriggerEvent(ent, events.start_near);
                    } else if (include && include !== "false") {
                        safeTriggerEvent(ent, events.stop);
                        safeTriggerEvent(ent, events.start);
                    } else {
                        safeTriggerEvent(ent, events.stop);
                    }
                    return;
                }
            }

            // normales
            const team = getTeam(ent);
            if (!team) return;
            const cfg = state[team] ?? {};
            const mode = cfg.mode ?? "false";
            if (mode === "near") {
                safeTriggerEvent(ent, events.stop);
                safeTriggerEvent(ent, events.start_near);
            } else if (mode === "normal") {
                safeTriggerEvent(ent, events.stop);
                safeTriggerEvent(ent, events.start);
            } else {
                safeTriggerEvent(ent, events.stop);
            }
            return;
        }

        // Sistemas booleanos: spawn / health
        if (systemName === "spawn" || systemName === "health") {
            const ev = EVENTS_BY_SYSTEM[systemName];
            if (!ev) return;

            // Especial Foundation (procesar y salir)
            if (isSpecialFoundation) {
                const cfg = state.foundation;
                if (cfg?.includeSpecial) safeTriggerEvent(ent, ev.start);
                else safeTriggerEvent(ent, ev.stop);
                return;
            }

            // Especial Chaos (procesar y salir)
            if (isSpecialChaos) {
                const cfg = state.chaos;
                if (cfg?.includeSpecial) safeTriggerEvent(ent, ev.start);
                else safeTriggerEvent(ent, ev.stop);
                return;
            }

            // Normales
            const team = getTeam(ent);
            if (!team) return;
            const cfg = state[team];
            if (cfg?.enable) safeTriggerEvent(ent, ev.start);
            else safeTriggerEvent(ent, ev.stop);
            return;
        }
    } catch (e) {
        debugWarn("applySystems", `Error aplicando ${systemName} a ${ent?.nameTag || "<noName>"}: ${e}`);
    }
}

export function applySystemToAll(systemName, dimension = null) {
    try {
        const seen = new Set();
        let appliedCount = 0;

        // 1) Escanear entidades en la dimensión solicitada o en todas si no se indicó
        debugMessage(
            "applySystems",
            `Dimension directa: ${dimension ? dimension.id : "ALL"}`
        );
        const dims = dimension ? [dimension] : ["overworld", "nether", "the_end"].map(id => world.getDimension(id)).filter(Boolean);
        for (const dim of dims) {
            const ents = dim.getEntities();
            for (const ent of ents) {
                if (!ent || !ent.id) continue;
                if (seen.has(ent.id)) continue;
                seen.add(ent.id);
                if (!isValidSoldier(ent)) continue;
                applySystemToEntity(systemName, ent);
                appliedCount += 1;
            }
        }

        // 2) Procesar lista auxiliar de soldados conocida (si existe)
        const allSoldiers = accessors.getAllSoldiers ? accessors.getAllSoldiers() : null;
        if (Array.isArray(allSoldiers)) {
            for (const id of allSoldiers) {
                if (seen.has(id)) continue;
                try {
                    const ent = world.getEntity(id);
                    if (!ent) continue;
                    seen.add(id);
                    if (!isValidSoldier(ent)) continue;
                    applySystemToEntity(systemName, ent);
                    appliedCount += 1;
                } catch { }
            }
        }

        const dimLabel = dimension ? (dimension?.id ?? "custom") : "all";
        debugMessage("applySystems", `applySystemToAll: ${systemName} aplicado a ${appliedCount} entidades (aplicadas) en dim=${dimLabel}, ${seen.size} procesadas`);
    } catch (e) {
        debugWarn("applySystems", `Error en applySystemToAll(${systemName}): ${e}`, "red");
    }
}

export default { setAccessors, applySystemToAll, applySystemToEntity };
