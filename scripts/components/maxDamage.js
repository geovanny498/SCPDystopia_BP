import { system } from "@minecraft/server";

function onHitEntity(arg) {
    try {
        const maxHealth = arg.hitEntity.getComponent("health")?.effectiveMax;
        arg.hitEntity.applyDamage(maxHealth ?? 99999999, {
            cause: "override"
        });
    } catch {}
}

system.beforeEvents.startup.subscribe(event => {
    event.itemComponentRegistry.registerCustomComponent(
        "scpdy:deal_max_damage_on_hit",
        { onHitEntity }
    );
});
