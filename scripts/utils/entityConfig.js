// utils/entityConfig.js

// Aquí defines entidades y si reciben daño/knockback
// true = recibe daño y knockback
// false = es inmune
import { EntityComponentTypes } from "@minecraft/server";

export const entityDamageConfig = {
    "minecraft:wither": {
        damage: (entity) => {
            const health = entity.getComponent("health");
            if (!health) return false;
            const maxHealth = health.effectiveMax;
                // console.warn(`Wither salud actual: ${health.currentValue}, máxima: ${maxHealth}`);

            return health.currentValue > maxHealth / 2; // solo recibe daño si >50%
        },
        knockback: false // siempre bloqueado
    },
    "minecraft:warden": {
        damage: true,
        knockback: false
    }
};
