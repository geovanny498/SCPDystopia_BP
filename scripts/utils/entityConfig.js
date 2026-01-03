// scripts\utils\entityConfig.js

// Aquí defines entidades y si reciben daño/knockback
// La configuración definida aquí no cambia el daño o knockback definido en los json de las entidades

// true = recibe daño y knockback
// false = es inmune

// Si no está definido, se asume que recibe ambos del script
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
            if (health.currentValue > maxHealth / 2) {
                return true; // solo recibe daño si >50%
            } else {
                return false;
            }
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
    "minecraft:ghast": {
        damage: true,
        knockback: false
    },
    "lc:dt_scp682": {
        damage: (entity) => {
            const health = entity.getComponent("health");
            if (!health) return false;
            const maxHealth = health.effectiveMax;
            // debugWarn("entityDamageConfig",`scp682 salud actual: ${health.currentValue}, máxima: ${maxHealth}`);
            if (health.currentValue < 39600) {
                return false; // No recibe daño si < 39600
            } else {
                return true;
            }
        },
        knockback: (entity) => {
            const health = entity.getComponent("health");
            if (!health) return false;
            const maxHealth = health.effectiveMax;
            // debugWarn("entityDamageConfig",`scp682 salud actual: ${health.currentValue}, máxima: ${maxHealth}`);
            if (health.currentValue < 39600) {
                return true; // Recibe knockback si < 39600
            } else {
                return false; // Depende del knockback_resistance dentro del json de la entidad
            }
        }
    },
    "lc:dt_scp096": {
        damage: (entity) => {
            const health = entity.getComponent("health");
            if (!health) return false;
            const maxHealth = health.effectiveMax;
            // debugWarn("entityDamageConfig",`scp096 salud actual: ${health.currentValue}, máxima: ${maxHealth}`);
            if (health.currentValue < 10000) {
                return false;// No recibe daño si < 10000
            } else {
                return true;
            }
        },
        knockback: true
    },
    "lc:dt_epsilon11_apache_combat": {
        damage: true,
        knockback: false
    }
};
