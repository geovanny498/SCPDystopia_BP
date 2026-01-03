// scripts\utils\teams.js
import * as mc from "@minecraft/server";

export const teamGroups = {
    chaos: new Set([
        "lc:dt_cd_commander",
        "lc:dt_cd_leader",
        "lc:dt_cd",
        "lc:dt_chaos_insurgency",
    ]),
    foundation: new Set([
        "lc:dt_chara",
        "lc:dt_thedeath",
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
        "lc:dt_epsilon6",
        "lc:dt_epsilon11_apache_combat",
    ]),
};

const helmetTeams = {
    "minecraft:golden_helmet": "chaos",
    "minecraft:netherite_helmet": "foundation",
    "minecraft:diamond_helmet": "foundation",
    "minecraft:iron_helmet": "foundation",
    "gabrielaplok:nv_goggles": "foundation",
};

export function getTeam(entityOrTypeId) {
    if (!entityOrTypeId) return null;

    let typeId;

    if (entityOrTypeId.typeId === "minecraft:player") {
        const equippable = entityOrTypeId.getComponent("equippable");
        const helmet = equippable?.getEquipment(mc.EquipmentSlot.Head);
        if (helmet) return helmetTeams[helmet.typeId] || null;
        return null;
    }

    typeId =
        typeof entityOrTypeId === "string"
            ? entityOrTypeId
            : entityOrTypeId.typeId;
    if (!typeId) return null;

    for (const team in teamGroups) {
        if (teamGroups[team].has(typeId)) return team;
    }

    return null;
}
