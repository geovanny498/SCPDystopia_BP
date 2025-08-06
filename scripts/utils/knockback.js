import { debugMessage, debugWarn } from "../utils/debug.js";

export function applyKnockback(entity, projectile, kb) {
    try {
        if (entity.typeId === "minecraft:player") return;
        const projectileLocation = projectile?.location;
        const entityLocation = entity?.location;

        if (!projectileLocation) {
            debugWarn("Error: El proyectil fue eliminado o no tiene ubicación.", "green");
            return;
        }

        if (!entityLocation) {
            debugWarn("Error: La entidad no tiene ubicación.", "green");
            return;
        }

        const knockbackRes = entity.getComponent("minecraft:knockback_resistance")?.value ?? 0;

        const dir = {
            x: projectileLocation.x - entityLocation.x,
            y: 0,
            z: projectileLocation.z - entityLocation.z
        };

        const mag = Math.hypot(dir.x, dir.z);
        if (mag > 0) {
            dir.x /= mag;
            dir.z /= mag;
        }

        const factor = Math.max(0, 1 - knockbackRes);

        // Verificar si está en agua
        const blockAtFeet = entity.dimension.getBlock({ 
            x: Math.floor(entityLocation.x), 
            y: Math.floor(entityLocation.y), 
            z: Math.floor(entityLocation.z) 
        });

        const isInWater = blockAtFeet?.typeId === "minecraft:water";

        entity.clearVelocity();

        entity.applyImpulse({
            x: dir.x * kb * factor,
            y: isInWater ? 0 : -0.4,
            z: dir.z * kb * factor
        });

        const entityName = entity.nameTag || entity.typeId || "Entidad desconocida";

        debugMessage(`Se aplicó knockback a ${entityName}. Ubicación del proyectil: (x: ${projectileLocation.x.toFixed(2)}, y: ${projectileLocation.y.toFixed(2)}, z: ${projectileLocation.z.toFixed(2)})`);

    } catch (error) {
        debugWarn("Error en applyKnockback: " + error, "red");
    }
}
