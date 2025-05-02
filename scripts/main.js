import { world } from "@minecraft/server";
import { getTeam } from "./utils/teams.js";
import { projectileConfig } from "./utils/projectileConfig.js";
import { getModifiedDamageNumber } from "./utils/damage.js";
import { applyKnockback } from "./utils/knockback.js";
import { debugMessage, debugWarn } from "./utils/debug.js";

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
            projectile.remove();
        } else {
            debugWarn("El proyectil no tiene la función remove.");
        }
    } catch (e) {
        debugWarn(`Error al eliminar el proyectil: ${e}`);
    }
}

// Función para aplicar daño y knockback
function applyDamageAndKnockback(projectile, target, cfg) {
    const dmg = getModifiedDamageNumber(cfg.damage, target);
    target.applyDamage(dmg, { cause: "override" });
    applyKnockback(target, projectile, cfg.knockback);
}

// Evento cuando un proyectil impacta a una entidad
world.afterEvents.projectileHitEntity.subscribe(event => {
    const projectile = event.projectile;
    const target = event.getEntityHit()?.entity;
    const shooter = event.source;
    const projectileLocation = (function () {
        try {
            return projectile?.location; // Intentamos obtener la ubicación
        } catch (e) {
            debugWarn(`Error al acceder a la ubicación del proyectil: ${e}`);  // Esto registrará el error si ocurre
            return null;  // Retorna null si ocurre un error
        }
    })();

    // Validación de objetos
    if (!projectile || !target || !shooter || shooter === target) {
        debugMessage("Falta objeto necesario o es fuego amigo.");
        return;
    }

    // Verificación de equipo para evitar fuego amigo
    const teamShooter = getTeam(shooter);
    const teamTarget = getTeam(target);

    if (teamShooter && teamTarget && teamShooter === teamTarget) {
        debugMessage("Fuego amigo detectado.");
        return;
    }

    const cfg = projectileConfig[projectile.typeId];
    if (!cfg) {
        debugMessage("No se encontró configuración para el proyectil.");
        return;
    }

    try {
        // Caso especial: Pierce infinito
        if (cfg.pierce === Infinity) {
            debugMessage("Pierce es Infinity. Solo aplicamos daño y knockback.");
            applyDamageAndKnockback(projectile, target, cfg);
            return;
        }

        // Caso especial: Pierce 0
        if (cfg.pierce === 0) {
            debugMessage("Pierce es 0. Eliminando proyectil tras el primer impacto.");
            applyDamageAndKnockback(projectile, target, cfg);
            removeProjectileSafe(projectile);
            return;
        }

        // Obtener tags de manera segura
        let tags = getTagsSafe(projectile);

        // Leer el contador de pierce
        const piercedTag = tags.find(tag => tag.startsWith("pierced:"));
        let pierced = piercedTag ? parseInt(piercedTag.split(":")[1]) : 0;
        const pierceLimit = cfg.pierce ?? 1;

        debugWarn(`Pierce actual: ${pierced}. Límite de pierce: ${pierceLimit}`);

        // Aplicar daño y knockback
        applyDamageAndKnockback(projectile, target, cfg);

        // Aumentar contador de impactos
        pierced++;

        // Actualizar el tag de pierce de manera segura
        if (piercedTag) {
            removeTagSafe(projectile, piercedTag);  // Eliminamos la tag existente
        }
        addTagSafe(projectile, `pierced:${pierced}`);  // Añadimos la nueva tag

        // Mostrar ubicación si la guardamos
        if (projectileLocation) {
            debugMessage(`El proyectil estaba en: (x: ${projectileLocation.x.toFixed(2)}, y: ${projectileLocation.y.toFixed(2)}, z: ${projectileLocation.z.toFixed(2)})`);
        } else {
            debugMessage("No se pudo obtener la ubicación inicial del proyectil.");
        }

        // Si alcanza el límite de pierces, eliminar el proyectil
        if (pierced >= pierceLimit) {
            debugMessage("Límite de pierce alcanzado. Eliminando proyectil.");
            removeProjectileSafe(projectile);  // Llamamos a la función de eliminación segura
        }

    } catch (e) {
        debugWarn(`Error general al aplicar daño: ${e}`);
        debugMessage(`Error general al aplicar daño: ${e}`);
    }
});