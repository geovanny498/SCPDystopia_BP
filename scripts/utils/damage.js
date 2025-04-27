import * as mc from "@minecraft/server";

const DEBUG_MODE = false; // Cambia a false para desactivar mensajes en el chat

export function getModifiedDamageNumber(damage, entity) {
    if (damage <= 0) {
        debugMessage("Daño negativo o nulo, no se aplicará.");
        return 0;
    }

    const originalDamage = damage;

    try {
        // 1) Reducción por efecto de Resistencia
        let res = entity.getEffect("minecraft:resistance");
        if (res) {
            const trueLevel = res.amplifier + 1;
            const reduction = trueLevel * 0.2;
            damage = Math.floor(damage * (1 - reduction));

            debugMessage(`Daño original: ${originalDamage} | Resistencia nivel ${trueLevel} (-${Math.round(reduction * 100)}%) => ${damage}`);
        }

        if (damage <= 0) {
            debugMessage("Daño final: 0 (anulado por resistencia)");
            return 0;
        }

        // 2) Reducción por Armadura y Encantamientos
        const equippable = entity.getComponent("equippable");
        if (!equippable) {
            debugMessage(`Daño final sin armadura: ${damage}`);
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

        slots.forEach((slot) => {
            const item = equippable.getEquipment(slot);
            if (!item) return;

            const eqComp = item.getComponent("equippable");
            defensePoints += eqComp?.defense ?? 0;
            armorToughness += eqComp?.armorToughness ?? 0;

            const ench = item.getComponent("enchantable");
            epf += ench?.getEnchantment("protection")?.level ?? 0;
            epf += (ench?.getEnchantment("projectile_protection")?.level ?? 0) * 2;
        });

        const armorReduction = Math.min(
            20,
            Math.max(defensePoints / 5, defensePoints - (4 * damage) / (armorToughness + 8))
        ) / 25;

        damage = Math.floor(damage * (1 - armorReduction));
        damage = Math.floor(damage - (Math.min(20, epf) / 25));

        if (damage <= 0) {
            debugMessage("Daño final: 0 (anulado por armadura/encantamientos)");
            return 0;
        }

        debugMessage(`Daño final tras armadura/encantamientos: ${damage}`);
        return damage;
    } catch (error) {
        debugWarn(`Error al calcular el daño: ${error.message}`);
        return damage; // Devolver el daño sin cambios en caso de error
    }
}

// Función para manejar mensajes de debug
function debugMessage(message) {
    if (DEBUG_MODE) {
        mc.world.sendMessage(`DEBUG: ${message}`);
    }
}

// Función para manejar warnings de debug
function debugWarn(message) {
    if (DEBUG_MODE) {
        console.warn(`DEBUG: ${message}`);
    }
}
