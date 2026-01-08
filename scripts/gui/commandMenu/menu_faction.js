// scripts/gui/commandMenu/menu_faction.js
import { getTeam } from "../../utils/teams.js";

/**
 * Módulo centralizado para determinar el bando, facción y si una entidad es especial
 * 
 * Este módulo evita duplicación de código en menu_events.js y menu_apply.js
 */

/**
 * Determina el bando, facción y si una entidad es especial
 * @param {Entity} ent - La entidad a evaluar
 * @param {Object} specialUnits - Objeto con arrays de unidades especiales { foundation: [], chaos: [] }
 * @returns {Object|null} - { faction: string, isSpecial: boolean } o null si no se pudo determinar
 */
export function getEntityFactionInfo(ent, specialUnits) {
    if (!ent) return null;

    const name = ent.nameTag ?? "";
    const isSpecialFoundation = specialUnits?.foundation?.includes(name);
    const isSpecialChaos = specialUnits?.chaos?.includes(name);

    let faction = null;
    let isSpecial = false;

    if (isSpecialFoundation) {
        faction = "foundation";
        isSpecial = true;
    } else if (isSpecialChaos) {
        faction = "chaos";
        isSpecial = true;
    } else {
        faction = getTeam(ent);
        isSpecial = false;
    }

    if (!faction) return null;

    return { faction, isSpecial };
}

/**
 * Verifica si una entidad es un soldado válido
 * @param {Entity} ent 
 * @param {Object} specialUnits - Objeto con arrays de unidades especiales { foundation: [], chaos: [] }
 * @returns {boolean}
 */
export function isValidSoldier(ent, specialUnits) {
    if (!ent) return false;
    if (ent.typeId === "minecraft:player") return false;

    const name = ent.nameTag ?? "";

    // Verificar si es especial
    if (specialUnits?.foundation?.includes(name)) return true;
    if (specialUnits?.chaos?.includes(name)) return true;

    // Verificar si pertenece a un bando
    const team = getTeam(ent);
    return team === "foundation" || team === "chaos";
}
