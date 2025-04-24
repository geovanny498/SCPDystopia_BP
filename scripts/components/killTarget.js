import { system } from "@minecraft/server";

function onHitEntity(arg) {
    try {
        arg.hitEntity.kill();
    } catch {}
}

system.beforeEvents.startup.subscribe(event => {
    event.itemComponentRegistry.registerCustomComponent(
        "scpdy:kill_target_on_hit",
        { onHitEntity }
    );
});
