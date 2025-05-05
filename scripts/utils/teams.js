// utils/teams.js
import * as mc from "@minecraft/server";

export const teamGroups = {
    chaos: new Set([
        "lc:dt_cd_commander",
        "lc:dt_cd_leader",
        "lc:dt_cd",
        "lc:dt_chaos_insurgency"
    ]),
    foundation: new Set([
        "lc:dt_chara",
        "lc:dt_alpha1c",
        "lc:dt_alpha1l",
        "lc:dt_alpha1",
        "lc:dt_epsilon11c",
        "lc:dt_epsilon11",
        "lc:dt_eta10c",
        "lc:dt_eta10",
        "lc:dt_nu7c",
        "lc:dt_nu7",
        "lc:dt_beta7c",
        "lc:dt_beta7",
        "lc:dt_epsilon6c",
        "lc:dt_epsilon6"
    ])
};

// Asigna jugadores a equipos según el casco que usen
export function getTeam(entityOrTypeId) {
    if (typeof entityOrTypeId === "string") {
        // Si es un typeId normal (entidad no jugador)
        for (const team in teamGroups) {
            if (teamGroups[team].has(entityOrTypeId)) return team;
        }
        return null;
    }

    // Si es una entidad (posiblemente jugador)
    const entity = entityOrTypeId;
    if (!entity || !entity.typeId) return null;
    if (entity.typeId === "minecraft:player") {
        const equippable = entity.getComponent("equippable");
        if (!equippable) return null;

        const helmet = equippable.getEquipment(mc.EquipmentSlot.Head);
        if (!helmet) return null;

        const helmetId = helmet.typeId;

        // Puedes modificar esto como quieras
        if (helmetId === "minecraft:golden_helmet") return "chaos";
        if (
            helmetId === "minecraft:netherite_helmet" ||
            helmetId === "minecraft:diamond_helmet" ||
            helmetId === "minecraft:iron_helmet" ||
            helmetId === "gabrielaplok:nv_goggles"
        ) return "foundation";

        return null;
    }

    // Para otras entidades (no jugadores)
    for (const team in teamGroups) {
        if (teamGroups[team].has(entityOrTypeId.typeId)) return team;
    }

    return null;
}