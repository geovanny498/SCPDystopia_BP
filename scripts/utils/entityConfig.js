// utils/entityConfig.js

// Aquí defines entidades y si reciben daño/knockback
// true = recibe daño y knockback
// false = es inmune
// Si no está definido, se asume que recibe ambos
// Debido a que no se puede leer knockback_resistance, se usa esta configuración para forzar inmunidad
import { EntityComponentTypes } from "@minecraft/server";
import { debugWarn } from "./debug";

export const entityDamageConfig = {
    "minecraft:ender_dragon": {
        damage: true,
        knockback: false
    },
    "minecraft:wither": {
        damage: (entity) => {
            const health = entity.getComponent("health");
            if (!health) return false;
            const maxHealth = health.effectiveMax;
            // debugWarn("entityDamageConfig",`Wither salud actual: ${health.currentValue}, máxima: ${maxHealth}`);

            return health.currentValue > maxHealth / 2; // solo recibe daño si >50%
        },
        knockback: false
    },
    "minecraft:warden": {
        damage: true,
        knockback: false
    },
    "minecraft:iron_golem": {
        damage: true,
        knockback: false
    },
    "lc:dt_scp682": {
        damage: (entity) => {
            const health = entity.getComponent("health");
            if (!health) return false;
            const maxHealth = health.effectiveMax;
            // debugWarn("entityDamageConfig",`scp682 salud actual: ${health.currentValue}, máxima: ${maxHealth}`);

            return health.currentValue > 10000; // solo recibe daño si > 10000
        },
        knockback: false
    },
    "lc:dt_scp096": {
        damage: (entity) => {
            const health = entity.getComponent("health");
            if (!health) return false;
            const maxHealth = health.effectiveMax;
            // debugWarn("entityDamageConfig",`scp096 salud actual: ${health.currentValue}, máxima: ${maxHealth}`);

            return health.currentValue > 10000; // solo recibe daño si > 10000
        },
        knockback: true
    }
};
