// scripts/gui/commandMenu/menu_rules.js

/**
 * Sistema de reglas declarativas para compatibilidad entre sistemas
 * 
 * Este módulo maneja:
 * 1. Compatibilidad entre sistemas (requires, locks)
 * 2. Control de aplicación (applyMode: "all" | "existing_only")
 */

import { debugWarn } from "../../utils/debug.js";

/**
 * Definición de reglas de compatibilidad para cada sistema
 * 
 * Propiedades:
 * - domain: Dominio al que pertenece el sistema (ej: "movement", "combat")
 * - requires: Objeto con dominios y valores requeridos para que este sistema se aplique
 * - locks: Array de dominios que este sistema bloquea (no se pueden aplicar simultáneamente)
 * - applyMode: "all" | "existing_only"
 *   - "all": Se aplica a entidades existentes Y futuras (spawn/load)
 *   - "existing_only": Solo se aplica a entidades existentes al enviar el formulario
 */
export const systemRules = {
    movement: {
        domain: "movement",
        applyMode: "existing_only"
    },

    fire: {
        domain: "combat",
        applyMode: "all"
    },

    distance: {
        domain: "distance",
        applyMode: "existing_only",  // ← Cambiado de "all" a "existing_only" para no colisionar con movement
        // Distance requiere que movement esté en modo "follow"
        // Si movement está en "free" o "stop", distance NO se aplica
        requires: {
            movement: ["follow"]
        }
    },

    spawn: {
        domain: "spawn",
        applyMode: "all"
    },

    health: {
        domain: "health",
        applyMode: "all"
    },

    teleport: {
        domain: "teleport",
        applyMode: "all"
    }
};

/**
 * Obtiene las reglas de un sistema
 * @param {string} systemId 
 * @returns {Object|null}
 */
export function getSystemRules(systemId) {
    return systemRules[systemId] || null;
}

/**
 * Verifica si un sistema puede aplicarse según sus reglas de compatibilidad
 * @param {string} systemId - ID del sistema a verificar
 * @param {Object} allSystemStates - Estados de todos los sistemas { systemId: { faction: { mode/enable, includeSpecial } } }
 * @param {string} faction - "foundation" | "chaos"
 * @param {boolean} isSpecial - Si la entidad es especial
 * @returns {boolean} - true si el sistema puede aplicarse
 */
export function canApplySystem(systemId, allSystemStates, faction, isSpecial) {
    const rules = getSystemRules(systemId);

    // Si no hay reglas, el sistema siempre se puede aplicar
    if (!rules) return true;

    // Si no hay requires, el sistema se puede aplicar
    if (!rules.requires) return true;

    // Verificar cada requisito
    for (const [requiredDomain, allowedValues] of Object.entries(rules.requires)) {
        // Buscar el sistema que pertenece a este dominio
        const requiredSystemId = findSystemByDomain(requiredDomain);

        if (!requiredSystemId) {
            debugWarn("menuRules:compat", `No se encontró sistema para dominio: ${requiredDomain}`, "yellow");
            continue;
        }

        const requiredState = allSystemStates[requiredSystemId];
        if (!requiredState || !requiredState[faction]) {
            debugWarn("menuRules:compat", `No hay estado para ${requiredSystemId} en faction ${faction}`, "yellow");
            return false;
        }

        const factionState = requiredState[faction];

        // Obtener el valor actual (mode para dropdown, enable para toggle)
        const currentValue = isSpecial
            ? factionState.includeSpecial
            : (factionState.mode !== undefined ? factionState.mode : factionState.enable);

        // Verificar si el valor actual está en los valores permitidos
        const isAllowed = Array.isArray(allowedValues)
            ? allowedValues.includes(currentValue)
            : allowedValues === currentValue;

        if (!isAllowed) {
            debugWarn("menuRules:compat",
                `Sistema ${systemId} NO puede aplicarse: ${requiredSystemId} debe ser ${JSON.stringify(allowedValues)}, pero es ${currentValue}`,
                "yellow");
            return false;
        }
    }

    return true;
}

/**
 * Busca el ID de un sistema por su dominio
 * @param {string} domain 
 * @returns {string|null}
 */
function findSystemByDomain(domain) {
    for (const [systemId, rules] of Object.entries(systemRules)) {
        if (rules.domain === domain) {
            return systemId;
        }
    }
    return null;
}

/**
 * Verifica si un sistema debe aplicarse a entidades futuras (spawn/load)
 * @param {string} systemId 
 * @returns {boolean}
 */
export function shouldApplyToFutureEntities(systemId) {
    const rules = getSystemRules(systemId);

    if (!rules) {
        debugWarn("menuRules:apply", `Sistema ${systemId}: Sin reglas, aplicar a futuras (default)`, "gray");
        return true; // Por defecto, aplicar a futuras
    }

    const shouldApply = rules.applyMode === "all";
    debugWarn("menuRules:apply",
        `Sistema ${systemId}: applyMode=${rules.applyMode}, aplicar a futuras=${shouldApply}`,
        shouldApply ? "green" : "yellow");

    return shouldApply;
}

/**
 * Filtra los sistemas que deben aplicarse según las reglas de compatibilidad
 * @param {Array<string>} systemIds - IDs de sistemas a aplicar
 * @param {Object} allSystemStates - Estados de todos los sistemas
 * @param {string} faction - "foundation" | "chaos"
 * @param {boolean} isSpecial - Si la entidad es especial
 * @returns {Array<string>} - IDs de sistemas que pueden aplicarse
 */
export function filterApplicableSystems(systemIds, allSystemStates, faction, isSpecial) {
    return systemIds.filter(systemId =>
        canApplySystem(systemId, allSystemStates, faction, isSpecial)
    );
}

/**
 * Obtiene información de diagnóstico sobre por qué un sistema no se puede aplicar
 * @param {string} systemId 
 * @param {Object} allSystemStates 
 * @param {string} faction 
 * @param {boolean} isSpecial 
 * @returns {Object} - { canApply: boolean, reason: string }
 */
export function getSystemApplicabilityInfo(systemId, allSystemStates, faction, isSpecial) {
    const rules = getSystemRules(systemId);

    if (!rules) {
        return { canApply: true, reason: "No hay reglas definidas" };
    }

    if (!rules.requires) {
        return { canApply: true, reason: "No hay requisitos" };
    }

    for (const [requiredDomain, allowedValues] of Object.entries(rules.requires)) {
        const requiredSystemId = findSystemByDomain(requiredDomain);

        if (!requiredSystemId) {
            return {
                canApply: false,
                reason: `Sistema requerido no encontrado para dominio: ${requiredDomain}`
            };
        }

        const requiredState = allSystemStates[requiredSystemId];
        if (!requiredState || !requiredState[faction]) {
            return {
                canApply: false,
                reason: `No hay estado para ${requiredSystemId}`
            };
        }

        const factionState = requiredState[faction];
        const currentValue = isSpecial
            ? factionState.includeSpecial
            : (factionState.mode !== undefined ? factionState.mode : factionState.enable);

        const isAllowed = Array.isArray(allowedValues)
            ? allowedValues.includes(currentValue)
            : allowedValues === currentValue;

        if (!isAllowed) {
            return {
                canApply: false,
                reason: `Requiere ${requiredSystemId}=${JSON.stringify(allowedValues)}, actual: ${currentValue}`
            };
        }
    }

    return { canApply: true, reason: "Todos los requisitos cumplidos" };
}
