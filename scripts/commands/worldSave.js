// scripts/commands/worldSave.js
import { world } from "@minecraft/server";

/**
 * Guarda el estado de un sistema
 * @param {string} systemName 
 * @param {Object} state 
 */
export function saveSystemState(systemName, state) {
    try {
        const propName = `scpd_system_${systemName}`;
        world.setDynamicProperty(propName, JSON.stringify(state));
        console.log(`[SCPDystopia] Propiedad guardada: ${propName}`);
    } catch (err) {
        console.warn(`[SCPDystopia] Error al guardar sistema ${systemName}: ${err}`);
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
        console.warn(`[SCPDystopia] Error al cargar sistema ${systemName}: ${err}`);
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
        // Reiniciar estados internos
        for (const key in systemStates) {
            systemStates[key] = {
                foundation: { enable: false, includeSpecial: false },
                chaos: { enable: false, includeSpecial: false }
            };
        }
        console.log("[SCPDystopia] Todos los sistemas reseteados");
    } catch (err) {
        console.warn(`[SCPDystopia] Error al resetear todos los sistemas: ${err}`);
    }
}
