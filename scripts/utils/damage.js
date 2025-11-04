// utils/damage.js
import * as mc from "@minecraft/server";
import { applyKnockback } from "./knockback";
import { debugMessage, debugWarn } from "./debug.js";
import { entityDamageConfig } from "./entityConfig.js";

export function applyDamageAndKnockback(projectile, target, cfg, shooter) {
    debugWarn(
        `Proyectil disparado por: ${shooter.typeId}, impacta objetivo: ${target.typeId}, proyectil: ${projectile.typeId}`,
        "blue"
    );

    const entityCfg = entityDamageConfig[target.typeId];
    const hasEntityCfg = !!entityCfg;

    const canDamage = hasEntityCfg && Object.prototype.hasOwnProperty.call(entityCfg, "damage")
        ? (typeof entityCfg.damage === "function"
            ? Boolean(entityCfg.damage(target))
            : Boolean(entityCfg.damage))
        : true; // por defecto true si no existe la propiedad

    const canKnockback = hasEntityCfg && Object.prototype.hasOwnProperty.call(entityCfg, "knockback")
        ? (typeof entityCfg.knockback === "function"
            ? Boolean(entityCfg.knockback(target))
            : Boolean(entityCfg.knockback))
        : true; // por defecto true si no existe la propiedad

    // DEBUG: mostrar información útil para verificar por qué una entidad recibe knockback
    try {
        debugWarn(`damage`, `entityCfg existe: ${hasEntityCfg}; tiene damage: ${hasEntityCfg && Object.prototype.hasOwnProperty.call(entityCfg, 'damage')}; tipo(damage): ${hasEntityCfg && typeof entityCfg.damage}; valor calculado canDamage: ${canDamage}`);
        debugWarn(`damage`, `tiene knockback: ${hasEntityCfg && Object.prototype.hasOwnProperty.call(entityCfg, 'knockback')}; tipo(knockback): ${hasEntityCfg && typeof entityCfg.knockback}; valor calculado canKnockback: ${canKnockback}`);
    } catch (e) {
        // no bloquear ejecución si falla el stringify o algo raro
        debugWarn(`Error al loggear entityCfg: ${e?.message ?? e}`);
    }

    if (!canDamage) {
        debugWarn(`damage`, `Daño bloqueado para ${target.typeId}`, "purple");
    } else if ((cfg.damage ?? 0) > 0) {
        const dmg = getModifiedDamageNumber(cfg.damage, target);
        if (dmg > 0) {
            target.applyDamage(dmg, {
                cause: "override",
                damagingEntity: shooter,
                damagingProjectile: projectile
            });
        }
    }

    if (!canKnockback) {
        debugWarn(`Knockback bloqueado para ${target.typeId}`, "purple");
    } else {
        applyKnockback(target, projectile, cfg.knockback);
    }

}

// Función de cálculo de daño, la dejé igual
export function getModifiedDamageNumber(damage, entity) {
    if (damage <= 0) {
        debugMessage("Daño negativo o nulo, no se aplicará.");
        return 0;
    }

    const originalDamage = damage;

    try {
        // 1) Reducción por efecto de Resistencia
        const res = entity.getEffect("minecraft:resistance");
        if (res) {
            const reduction = (res.amplifier + 1) * 0.2;
            damage = Math.floor(damage * (1 - reduction));
            debugMessage(`Daño original: ${originalDamage} | Resistencia nivel ${res.amplifier + 1} (-${Math.round(reduction * 100)}%) => ${damage}`);
        }

        if (damage <= 0) {
            debugWarn("Daño final: 0 (anulado por resistencia)", "green");
            return 0;
        }

        // 2) Reducción por Armadura y Encantamientos
        const equippable = entity.getComponent("equippable");
        if (!equippable) {
            debugWarn(`Daño final sin armadura: ${damage}`, "green");
            return damage;
        }

        let defensePoints = 0, armorToughness = 0, epf = 0;
        for (const slot of [mc.EquipmentSlot.Head, mc.EquipmentSlot.Chest, mc.EquipmentSlot.Legs, mc.EquipmentSlot.Feet]) {
            const item = equippable.getEquipment(slot);
            if (!item) continue;

            const eqComp = item.getComponent("equippable");
            defensePoints += eqComp?.defense ?? 0;
            armorToughness += eqComp?.armorToughness ?? 0;

            const ench = item.getComponent("enchantable");
            epf += (ench?.getEnchantment("protection")?.level ?? 0) + (ench?.getEnchantment("projectile_protection")?.level ?? 0) * 2;
        }

        const armorReduction = Math.min(20, Math.max(defensePoints / 5, defensePoints - (4 * damage) / (armorToughness + 8))) / 25;
        damage = Math.floor(damage * (1 - armorReduction) - Math.min(20, epf) / 25);

        if (damage <= 0) {
            debugMessage("Daño final: 0 (anulado por armadura/encantamientos)");
            return 0;
        }

        debugMessage(`Daño final tras armadura/encantamientos: ${damage}`);
        return damage;
    } catch (error) {
        debugWarn(`Error al calcular el daño: ${error.message}`, "red");
        return damage; // Devolver el daño sin cambios en caso de error
    }
}
