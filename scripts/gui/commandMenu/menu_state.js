// scripts/gui/commandMenu/menu_state.js
import { saveSystemState, loadSystemState } from "../../commands/worldSave.js";
import { getSystemConfig, getSystemDefaults, getSystemEvents } from "./menu_config.js";
import { applySystemWithEvents } from "./menu_apply.js";
import { updateMenuSystemState } from "./menu_events.js";
import { debugWarn } from "../../utils/debug.js";

/**
 * Carga el estado de un sistema desde propiedades dinámicas
 * Si no existe, retorna los valores por defecto
 * @param {string} systemId 
 * @returns {Object}
 */
export function loadSystemOrDefault(systemId) {
    const loaded = loadSystemState(systemId);
    if (loaded) return loaded;
    return getSystemDefaults(systemId);
}

/**
 * Carga los estados de múltiples sistemas
 * @param {Array<string>} systemIds 
 * @returns {Object}
 */
export function loadSystemStates(systemIds) {
    const states = {};

    systemIds.forEach(systemId => {
        states[systemId] = loadSystemOrDefault(systemId);
    });

    return states;
}

/**
 * Guarda el estado de un sistema en propiedades dinámicas
 * y actualiza el estado compartido en memoria
 * @param {string} systemId 
 * @param {Object} state 
 */
export function saveSystemAndUpdateMemory(systemId, state) {
    try {
        // Guardar en propiedades dinámicas
        saveSystemState(systemId, state);

        // Actualizar estado en memoria del menú (independiente de toggle_system)
        updateMenuSystemState(systemId, state);

        debugWarn("menuState", `Sistema ${systemId} guardado y actualizado en memoria`, "green");
    } catch (e) {
        debugWarn("menuState", `Error guardando sistema ${systemId}: ${e}`, "red");
    }
}

/**
 * Guarda los estados de múltiples sistemas
 * @param {Object} parsedStates - Estados parseados del formulario
 */
export function saveSystemStates(parsedStates) {
    for (const systemId in parsedStates) {
        saveSystemAndUpdateMemory(systemId, parsedStates[systemId]);
    }
}

/**
 * Aplica un sistema a todas las entidades usando los eventos de la configuración
 * @param {string} systemId 
 * @param {Dimension} dimension 
 */
export function applySystemToAll(systemId, dimension) {
    try {
        const systemConfig = getSystemConfig(systemId);
        if (!systemConfig) {
            debugWarn("menuState", `Sistema ${systemId} no encontrado en configuración`, "red");
            return;
        }

        applySystemWithEvents(systemId, systemConfig, dimension);
        debugWarn("menuState", `Sistema ${systemId} aplicado`, "green");
    } catch (e) {
        debugWarn("menuState", `Error aplicando sistema ${systemId}: ${e}`, "red");
    }
}

/**
 * Aplica múltiples sistemas
 * @param {Array<string>} systemIds 
 * @param {Dimension} dimension 
 */
export function applySystemsToAll(systemIds, dimension) {
    systemIds.forEach(systemId => {
        applySystemToAll(systemId, dimension);
    });
}
