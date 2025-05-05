// main.js
import { world, system } from "@minecraft/server";
import { getTeam } from "./utils/teams.js";
import { projectileConfig } from "./utils/projectileConfig.js";
import { applyDamageAndKnockback } from "./utils/damage.js";
import { debugMessage, debugWarn } from "./utils/debug.js";
import { projectileShooterMap } from "./utils/weapons.js";

// Función para obtener las tags de manera segura
function getTagsSafe(projectile) {
    try {
        return projectile && projectile.getTags ? projectile.getTags() : [];
    } catch (e) {
        debugWarn(`Error al obtener las tags del proyectil: ${e}`);
        return [];  // Retorna un array vacío en caso de error
    }
}

// Función para añadir una tag de manera segura
function addTagSafe(projectile, tag) {
    try {
        if (projectile && projectile.addTag) {
            projectile.addTag(tag);
        } else {
            debugWarn("El proyectil no tiene la función addTag.");
        }
    } catch (e) {
        debugWarn(`Error al agregar la tag al proyectil: ${e}`);
    }
}

// Función para eliminar una tag de manera segura
function removeTagSafe(projectile, tag) {
    try {
        if (projectile && projectile.removeTag) {
            projectile.removeTag(tag);
        } else {
            debugWarn("El proyectil no tiene la función removeTag.");
        }
    } catch (e) {
        debugWarn(`Error al eliminar la tag del proyectil: ${e}`);
    }
}

// Función para eliminar el proyectil de manera segura
function removeProjectileSafe(projectile) {
    try {
        if (projectile && projectile.remove) {
            debugWarn(`Tipo de entidad del proyectil: ${projectile.typeId}`);
            debugWarn(`Propiedades del proyectil: ${Object.getOwnPropertyNames(projectile)}`);
            // projectile.remove();
        } else {
            debugWarn("El proyectil no tiene la función remove.");
        }
    } catch (e) {
        debugWarn(`Error al eliminar el proyectil: ${e}`);
    }
}

// Evento cuando un proyectil impacta a una entidad
world.afterEvents.projectileHitEntity.subscribe(event => {
    const projectile = event.projectile;
    const target = event.getEntityHit()?.entity;
    const shooter = event.source ? event.source : projectileShooterMap.get(projectile.id);
    const teamShooter = getTeam(shooter);
    const teamTarget = getTeam(target);
    const projectileLocation = (function () {
        try {
            return projectile?.location; // Intentamos obtener la ubicación
        } catch (e) {
            debugWarn(`Error al acceder a la ubicación del proyectil: ${e}`);
            return null;  // Retorna null si ocurre un error
        }
    })();

    // Validación de objetos
    if (!projectile || !target) {
        debugWarn("Falta objeto necesario o es fuego amigo.");
        return;
    }

    // Verificación de equipo para evitar fuego amigo
    if (teamShooter && teamTarget && teamShooter === teamTarget) {
        try {
            debugWarn(`Fuego amigo detectado. Disparador: ${teamShooter}, Objetivo: ${teamTarget}`);
            // projectile.remove();
        } catch (error) {
            debugWarn(`Error al eliminar el proyectil: ${error}`);
        }
        return;
    }
    const cfg = projectileConfig[projectile.typeId];
    if (!cfg) {
        debugWarn("No se encontró configuración para el proyectil.");
        return;
    }
    try {
        // Caso especial: Pierce infinito
        if (cfg.pierce === Infinity) {
            debugWarn("Pierce es Infinity. Solo aplicamos daño y knockback.");
            applyDamageAndKnockback(projectile, target, cfg, shooter);
            return;
        }
        // Obtener tags de manera segura
        let tags = getTagsSafe(projectile);
        // Leer el contador de pierce
        const piercedTag = tags.find(tag => tag.startsWith("pierced:"));
        let pierced = piercedTag ? parseInt(piercedTag.split(":")[1]) : 0;
        const pierceLimit = cfg.pierce ?? 1;
        if (pierced >= pierceLimit) {
            debugWarn(`Pierce actual: ${pierced}. Límite de pierce: ${pierceLimit}`);
            debugWarn("Límite de pierce alcanzado. Eliminando proyectil.");
            removeProjectileSafe(projectile)
            projectileShooterMap.delete(projectile.id); // Vaciar map
            return
        }
        debugWarn(`Pierce actual: ${pierced}. Límite de pierce: ${pierceLimit}`);
        // Aplicar daño y knockback
        applyDamageAndKnockback(projectile, target, cfg, shooter);
        // Aumentar contador de impactos
        pierced++;
        // Actualizar el tag de pierce de manera segura
        if (piercedTag) {
            removeTagSafe(projectile, piercedTag);  // Eliminamos la tag existente
        }
        addTagSafe(projectile, `pierced:${pierced}`);  // Añadimos la nueva tag
        // Mostrar ubicación si la guardamos
        if (projectileLocation) {
            debugWarn(`El proyectil estaba en: (x: ${projectileLocation.x.toFixed(2)}, y: ${projectileLocation.y.toFixed(2)}, z: ${projectileLocation.z.toFixed(2)})`);
        } else {
            debugWarn("No se pudo obtener la ubicación inicial del proyectil.");
        }
        // Si alcanza el límite de pierces, eliminar el proyectil
    } catch (e) {
        debugWarn(`Error general al aplicar daño: ${e}`);
    }
});