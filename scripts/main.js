// main.js
import { world, system } from "@minecraft/server";
import { getTeam } from "./utils/teams.js";
import { projectileConfig } from "./utils/projectileConfig.js";
import { applyDamageAndKnockback } from "./utils/damage.js";
import { debugMessage, debugWarn } from "./utils/debug.js";
import { projectileShooterMap } from "./utils/weapons.js";

// Función para eliminar el proyectil de manera segura
function removeProjectileSafe(projectile) {
    try {
        if (projectile && projectile.remove) {
            debugWarn(`Tipo de entidad del proyectil: ${projectile.typeId}`, "blue");
            debugWarn(`Propiedades del proyectil: ${Object.getOwnPropertyNames(projectile)}`, "blue");
            // projectile.remove();
        } else {
            debugWarn("El proyectil no tiene la función remove.", "red");
        }
    } catch (e) {
        debugWarn(`Error al eliminar el proyectil: ${e}`, "red");
    }
}
const projectilePierceMap = new WeakMap();

// Evento cuando un proyectil impacta a una entidad
world.afterEvents.projectileHitEntity.subscribe(event => {
    const projectile = event.projectile;
    const target = event.getEntityHit()?.entity;
    if (!projectile || !target) {
        debugWarn("Falta objeto necesario o es fuego amigo.", "yellow");
        return;
    }
    const shooter = event.source ? event.source : projectileShooterMap.get(projectile.id);
    const teamShooter = getTeam(shooter);
    const teamTarget = getTeam(target);
    let projectileLocation = null;
    try {
        projectileLocation = projectile?.location;
    } catch (e) {
        debugWarn(`Error al acceder a la ubicación del proyectil: ${e}`, "red");
    }

    if (shooter && target.id === shooter.id) {
        debugWarn("El proyectil intentó dañar a su propio tirador. Cancelando daño.", "yellow");
        return;
    }

    // Verificación de equipo para evitar fuego amigo
    if (teamShooter && teamTarget && teamShooter === teamTarget) {
        try {
            debugWarn(`Fuego amigo detectado. Disparador: ${teamShooter}, Objetivo: ${teamTarget}`, "cyan");
            // projectile.remove();
        } catch (error) {
            debugWarn(`Error al eliminar el proyectil: ${error}`, "red");
        }
        return;
    }
    const cfg = projectileConfig[projectile.typeId];
    if (!cfg) {
        debugWarn("No se encontró configuración para el proyectil.", "red");
        return;
    }
    try {
        // Caso especial: Pierce infinito
        if (cfg.pierce === Infinity) {
            debugWarn("Pierce es Infinity. Solo aplicamos daño y knockback.", "green");
            applyDamageAndKnockback(projectile, target, cfg, shooter);
            return;
        }

        let pierced = projectilePierceMap.get(projectile) ?? 0;
        const pierceLimit = cfg.pierce ?? 1;
        if (pierced >= pierceLimit) {
            debugWarn(`Pierce actual: ${pierced}. Límite de pierce: ${pierceLimit}`, "cyan");
            debugWarn("Límite de pierce alcanzado. Eliminando proyectil.", "cyan");
            // removeProjectileSafe(projectile);
            projectileShooterMap.delete(projectile.id);
            return;
        }

        debugWarn(`Pierce actual: ${pierced}. Límite de pierce: ${pierceLimit}`, "green");
        applyDamageAndKnockback(projectile, target, cfg, shooter);

        projectilePierceMap.set(projectile, pierced + 1);

        // if (projectileLocation) {
        //     debugWarn(`El proyectil estaba en: (x: ${projectileLocation.x.toFixed(2)}, y: ${projectileLocation.y.toFixed(2)}, z: ${projectileLocation.z.toFixed(2)})`, "blue");
        // } else {
        //     debugWarn("No se pudo obtener la ubicación inicial del proyectil.", "red");
        // }

    } catch (e) {
        debugWarn(`Error general al aplicar daño: ${e}`, "red");
    }

});

world.afterEvents.entityRemove.subscribe(event => {
    const removedEntityId = event.removedEntityId;
    const entity = event.typeId;
    debugWarn(`Entidad eliminada: ${entity} Id: ${removedEntityId}`, "magenta");

    // Verifica si el proyectil aún está en el mapa antes de eliminarlo
    if (projectileShooterMap.has(removedEntityId)) {
        // Elimina el proyectil del mapa
        projectileShooterMap.delete(removedEntityId);
        debugWarn(`El proyectil ${removedEntityId} ha sido eliminado del mapa.`, "green");
    } else {
        debugWarn(`No se encontró el proyectil con ID ${removedEntityId} en el mapa.`, "magenta");
    }
});