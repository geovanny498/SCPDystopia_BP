import { system } from "@minecraft/server";

function onHitEntity(arg) {
    if (arg.hitEntity.typeId === "minecraft:player") {
        arg.hitEntity.kill();
        return;
    }
    try {
        arg.hitEntity.remove();
    } catch {}
}

system.beforeEvents.startup.subscribe(event => {
    event.itemComponentRegistry.registerCustomComponent(
        "scpdy:remove_target_on_hit",
        { onHitEntity }
    );
});
