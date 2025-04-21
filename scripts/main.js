import * as mc43 from "@minecraft/server";
function onHitEntity(arg) {
    try {
        const maxHealth = arg.hitEntity.getComponent("health")?.effectiveMax;
        arg.hitEntity.applyDamage(maxHealth ?? 99999999, {
            cause: mc43.EntityDamageCause.override
        });
    } catch {
    }
}
mc43.system.beforeEvents.startup.subscribe((event) => {
    event.itemComponentRegistry.registerCustomComponent("scpdy:deal_max_damage_on_hit", {
        onHitEntity
    });
});

import * as mc45 from "@minecraft/server";
function onHitEntity2(arg) {
    try {
        arg.hitEntity.kill();
    } catch {
    }
}
mc45.system.beforeEvents.startup.subscribe((event) => {
    event.itemComponentRegistry.registerCustomComponent("scpdy:kill_target_on_hit", {
        onHitEntity: onHitEntity2
    });
});

import * as mc47 from "@minecraft/server";
function onHitEntity3(arg) {
    if (arg.hitEntity.typeId === "minecraft:player") {
        arg.hitEntity.kill();
        return;
    }
    try {
        arg.hitEntity.remove();
    } catch {
    }
}
mc47.system.beforeEvents.startup.subscribe((event) => {
    event.itemComponentRegistry.registerCustomComponent("scpdy:remove_target_on_hit", {
        onHitEntity: onHitEntity3
    });
});