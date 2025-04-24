import { world } from "@minecraft/server";
import { getTeam } from "./utils/teams.js";
import { projectileConfig } from "./utils/projectileConfig.js";
import { getModifiedDamageNumber } from "./utils/damage.js";
import { applyKnockback } from "./utils/knockback.js";

world.afterEvents.projectileHitEntity.subscribe(event => {
    const projectile = event.projectile;
    const target     = event.getEntityHit()?.entity;
    const shooter    = event.source;

    if (!projectile || !target || !shooter || shooter === target) return;

    const teamShooter = getTeam(shooter.typeId);
    const teamTarget  = getTeam(target.typeId);

    if (teamShooter && teamTarget && teamShooter === teamTarget) {
        // bloquea fuego amigo
        return;
    }

    const cfg = projectileConfig[projectile.typeId];
    if (!cfg) return;

    try {
        const dmg = getModifiedDamageNumber(cfg.damage, target);
        target.applyDamage(dmg, { cause: "override" });
        applyKnockback(target, projectile, cfg.knockback);
    } catch (e) {
        console.warn(`Error al aplicar daño: ${e}`);
    }
});
