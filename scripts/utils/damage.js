// utils/damage.js
import * as mc from "@minecraft/server";

export function getModifiedDamageNumber(damage, entity) {
    if (damage <= 0) return 0;

    // 1) Reducción por efecto de Resistencia
    const res = entity.getEffect("minecraft:resistance");
    if (res) {
        damage = Math.floor(damage * (1 - res.amplifier * 0.2));
    }
    if (damage <= 0) return 0;

    // 2) Reducción por Armadura y Encantamientos
    const equippable = entity.getComponent("equippable");
    if (!equippable) return damage;

    let defensePoints = 0;
    let armorToughness = 0;
    let epf = 0; // Enchantment Protection Factor

    // Para cada ranura de armadura
    const slots = [
        mc.EquipmentSlot.Head,
        mc.EquipmentSlot.Chest,
        mc.EquipmentSlot.Legs,
        mc.EquipmentSlot.Feet
    ];
    for (const slot of slots) {
        const item = equippable.getEquipment(slot);
        if (!item) continue;

        // Puntos de armadura y dureza
        const eqComp = item.getComponent("equippable");
        defensePoints += eqComp?.defense ?? 0;
        armorToughness += eqComp?.armorToughness ?? 0;

        // Protección por encantamientos
        const ench = item.getComponent("enchantable");
        epf += ench?.getEnchantment("protection")?.level ?? 0;
        epf += (ench?.getEnchantment("projectile_protection")?.level ?? 0) * 2;
    }

    // 2a) Reducción por Armadura ― fórmula vanilla simplificada
    const armorReduction = Math.min(
        20,
        Math.max(defensePoints / 5,
            defensePoints - (4 * damage) / (armorToughness + 8))
    ) / 25;
    damage = Math.floor(damage * (1 - armorReduction));

    // 2b) Reducción por Encantamientos
    damage = Math.floor(damage - (Math.min(20, epf) / 25));
    if (damage <= 0) return 0;

    return damage;
}
