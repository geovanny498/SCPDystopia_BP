// scripts/commands/worldSave.js
import { world } from "@minecraft/server";
import { debugMessage, debugWarn } from "../utils/debug";

/**
 * Guarda el estado de un sistema
 * @param {string} systemName 
 * @param {Object} state 
 */
export function saveSystemState(systemName, state) {
    try {
        const propName = `scpd_system_${systemName}`;
        world.setDynamicProperty(propName, JSON.stringify(state));
        debugMessage("dynamicProperties", `[SCPDystopia] Propiedad guardada: ${propName}`, "blue");
    } catch (err) {
        debugWarn("dynamicProperties", `[SCPDystopia] Error al guardar sistema ${systemName}: ${err}`, "red");
    }
}

/**
 * Carga el estado de un sistema
 * @param {string} systemName 
 * @returns {Object|undefined}
 */
export function loadSystemState(systemName) {
    try {
        const prop = world.getDynamicProperty(`scpd_system_${systemName}`);
        if (!prop) return undefined;
        return JSON.parse(prop);
    } catch (err) {
        debugWarn("dynamicProperties", `[SCPDystopia] Error al cargar sistema ${systemName}: ${err}`, "red");
        return undefined;
    }
}

/**
 * Resetea todos los sistemas guardados
 * @param {Object} systemStates Referencia a los estados internos
 */

export function resetAllSystems(systemStates) {
    try {
        world.clearDynamicProperties();

        for (const key in systemStates) {
            if (key === "teleport") {
                systemStates[key] = {
                    foundation: { mode: "false", includeSpecial: "false" },
                    chaos: { mode: "false", includeSpecial: "false" }
                };
            } else {
                systemStates[key] = {
                    foundation: { enable: false, includeSpecial: false },
                    chaos: { enable: false, includeSpecial: false }
                };
            }
        }
        console.log("[SCPDystopia] Todos los sistemas reseteados");
    } catch (err) {
        console.warn(`[SCPDystopia] Error al resetear todos los sistemas: ${err}`);
    }
}
