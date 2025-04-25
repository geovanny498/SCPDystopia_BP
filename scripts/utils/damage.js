// utils/damage.js
import * as mc from "@minecraft/server";

const DEBUG_MODE = false; // Cambia a false para desactivar mensajes en el chat

export function getModifiedDamageNumber(damage, entity) {
    if (damage <= 0) return 0;

    const originalDamage = damage;

    // 1) Reducción por efecto de Resistencia
    const res = entity.getEffect("minecraft:resistance");
    if (res) {
        const trueLevel = res.amplifier + 1;
        const reduction = trueLevel * 0.2;
        damage = Math.floor(damage * (1 - reduction));

        if (DEBUG_MODE) {
            mc.world.sendMessage(
                `Daño original: ${originalDamage} | Resistencia nivel ${trueLevel} (-${Math.round(reduction * 100)}%) => ${damage}`
            );
        }
    }

    if (damage <= 0) {
        if (DEBUG_MODE) mc.world.sendMessage(`Daño final: 0 (anulado por resistencia)`);
        return 0;
    }

    // 2) Reducción por Armadura y Encantamientos
    const equippable = entity.getComponent("equippable");
    if (!equippable) {
        if (DEBUG_MODE) mc.world.sendMessage(`Daño final sin armadura: ${damage}`);
        return damage;
    }

    let defensePoints = 0;
    let armorToughness = 0;
    let epf = 0;

    const slots = [
        mc.EquipmentSlot.Head,
        mc.EquipmentSlot.Chest,
        mc.EquipmentSlot.Legs,
        mc.EquipmentSlot.Feet
    ];
    for (const slot of slots) {
        const item = equippable.getEquipment(slot);
        if (!item) continue;

        const eqComp = item.getComponent("equippable");
        defensePoints += eqComp?.defense ?? 0;
        armorToughness += eqComp?.armorToughness ?? 0;

        const ench = item.getComponent("enchantable");
        epf += ench?.getEnchantment("protection")?.level ?? 0;
        epf += (ench?.getEnchantment("projectile_protection")?.level ?? 0) * 2;
    }

    const armorReduction = Math.min(
        20,
        Math.max(defensePoints / 5,
            defensePoints - (4 * damage) / (armorToughness + 8))
    ) / 25;
    damage = Math.floor(damage * (1 - armorReduction));
    damage = Math.floor(damage - (Math.min(20, epf) / 25));

    if (damage <= 0) {
        if (DEBUG_MODE) mc.world.sendMessage(`Daño final: 0 (anulado por armadura/encantamientos)`);
        return 0;
    }

    if (DEBUG_MODE) mc.world.sendMessage(`Daño final tras armadura/encantamientos: ${damage}`);
    return damage;
}
