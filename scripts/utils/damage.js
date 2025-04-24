export function getModifiedDamageNumber(damage, entity) {
    if (damage <= 0) return 0;
    const res = entity.getEffect("minecraft:resistance");
    if (res) {
        damage = Math.floor(damage * (1 - res.amplifier * 0.2));
    }
    return Math.max(0, damage);
}