import { debugMessage, debugWarn } from "../utils/debug.js";
import { entityDamageConfig } from "./entityConfig.js";

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

        // Actualmente no obtenible
        const compKbRes = entity.getComponent("minecraft:knockback_resistance")?.value;
        
        if (compKbRes == undefined) {
            debugWarn("applyKnockback", `Entidad ${entity.typeId} no se encontró knockback_resistance=${compKbRes}`, "purple");
        }

        // Valor por defecto desde componente (o 0). Si en entityDamageConfig está knockback: false, forzar 1.
        const config = entityDamageConfig?.[entity.typeId];
        let knockbackRes = compKbRes ?? 0;
        if (config && config.knockback === false) {
            knockbackRes = 1;
            debugWarn("applyKnockback", `Entidad ${entity.typeId} está configurada como inmune a knockback en entityDamageConfig — forzando knockback_resistance=1`, "purple");
        }

        if (knockbackRes >= 1) {
            debugWarn("applyKnockback", `Entidad ${entity.typeId} tiene knockback_resistance = ${knockbackRes}(inmune) — no se aplicará knockback.`, "purple");
            // return;
        }

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

        debugMessage(`Se aplicó knockback a ${entityName}.Ubicación del proyectil: (x: ${projectileLocation.x.toFixed(2)}, y: ${projectileLocation.y.toFixed(2)}, z: ${projectileLocation.z.toFixed(2)})`);

    } catch (error) {
        debugWarn("Error en applyKnockback: " + error, "red");
    }
}
