export function applyKnockback(entity, projectile, kb) {
    const knockbackRes = entity
        .getComponent("minecraft:knockback_resistance")
        ?.value ?? 0;
    const dir = {
        x: projectile.location.x - entity.location.x,
        y: 0,
        z: projectile.location.z - entity.location.z
    };
    const mag = Math.hypot(dir.x, dir.z);
    if (mag > 0) {
        dir.x /= mag;
        dir.z /= mag;
    }
    const factor = Math.max(0, 1 - knockbackRes);
    entity.applyImpulse({
        x: dir.x * kb * factor,
        y: 0,
        z: dir.z * kb * factor
    });
}
