import { world, system, EquipmentSlot } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import config from "./config.js";
import { debugWarn } from "../utils/debug.js";

function getConfigForEntity(typeId) {
    const globalCfg =
        config.global && config.global.categories
            ? config.global.categories
            : [];
    // Resolve entity entry: config.entities is grouped by faction
    let entVal = undefined;
    let groupName = null;
    if (config.entities && typeof config.entities === "object") {
        for (const gName of Object.keys(config.entities)) {
            const group = config.entities[gName];
            if (group && Object.prototype.hasOwnProperty.call(group, typeId)) {
                entVal = group[typeId];
                groupName = gName;
                break;
            }
        }
    }
    if (entVal === undefined) return null;

    let allowed = true;
    if (typeof entVal === "object" && entVal !== null) {
        if (Object.prototype.hasOwnProperty.call(entVal, "enabled")) {
            allowed = Boolean(entVal.enabled);
        } else {
            allowed = true;
        }
    } else {
        allowed = Boolean(entVal);
    }
    if (!allowed) {
        debugWarn(
            "playerInteractWithEntity",
            `menu blocked by config.entities[${groupName}]\.${typeId} = ${JSON.stringify(
                entVal
            )}`,
            "blue"
        );
        return null;
    }

    // Start from global
    let categories = Array.isArray(globalCfg) ? [...globalCfg] : [];

    // Apply specific overrides/extends
    const spec = config.specific && config.specific[typeId];
    if (spec) {
        const specCats = Array.isArray(spec.categories) ? spec.categories : [];
        if (spec.replace) {
            categories = [...specCats];
        } else if (specCats.length) {
            const insertAt =
                spec.insertAt && spec.insertAt === "start" ? "start" : "end";
            if (insertAt === "start") categories = specCats.concat(categories);
            else categories = categories.concat(specCats);
        }
    }

    return categories;
}

function itemMatches(mainId, opener) {
    if (!mainId || !opener) return false;
    // If opener explicitly contains namespace, compare exact
    if (opener.indexOf(":") !== -1) return mainId === opener;
    // opener in short form (e.g. "breeze_rod"): accept if mainId ends with ":<opener>" or short part equals
    const parts = mainId.split(":");
    const short = parts.length > 1 ? parts[1] : parts[0];
    return (
        short === opener || mainId === opener || mainId.endsWith(`:${opener}`)
    );
}

world.beforeEvents.playerInteractWithEntity.subscribe((ev) => {
    try {
        const player = ev.player;
        const entity = ev.target;
        debugWarn(
            "playerInteractWithEntity",
            `handler fired player=${player?.name ?? "?"} target=${entity?.typeId ?? entity?.id ?? "?"
            }`
        );
        if (!player || !entity) return;
        // determine group and required opener item
        let entGroup = null;
        if (config.entities && typeof config.entities === "object") {
            for (const gName of Object.keys(config.entities)) {
                const group = config.entities[gName];
                if (
                    group &&
                    Object.prototype.hasOwnProperty.call(
                        group,
                        entity.typeId ?? entity.id ?? entity.__identifier__
                    )
                ) {
                    entGroup = gName;
                    break;
                }
            }
        }
        const openerItem =
            (entGroup && config.openItem && config.openItem[entGroup]) ||
            config.openItem?.default ||
            "lc:dt_commander";
        try {
            const mainhand = player
                .getComponent("equippable")
                ?.getEquipment(EquipmentSlot.Mainhand);
            const mainId = mainhand?.typeId ?? mainhand?.id ?? null;
            debugWarn(
                "playerInteractWithEntity",
                `player mainhand=${mainId} (opener for ${entGroup} = ${openerItem})`
            );
            if (!itemMatches(mainId, openerItem)) {
                debugWarn(
                    "playerInteractWithEntity",
                    `menu blocked: player must hold ${openerItem} for faction ${entGroup} (mainhand=${mainId})`,
                    "blue"
                );

                return;
            }
            ev.cancel = true;
        } catch (e) {
            debugWarn(
                "playerInteractWithEntity",
                `error reading mainhand: ${e}`,
                "red"
            );
            return;
        }
        const typeId =
            entity.typeId ?? entity.id ?? entity.__identifier__ ?? null;
        const cfg = getConfigForEntity(typeId);
        if (!cfg) {
            debugWarn(
                "playerInteractWithEntity",
                `no config for ${typeId}`,
                "blue"
            );
            return;
        }

        // Determinar un nombre legible para la entidad (fallback a typeId)
        let displayName = typeId;
        try {
            if (entity.nameTag) displayName = entity.nameTag;
            else if (typeof entity.getName === "function")
                displayName = entity.getName();
            else if (entity.name) displayName = entity.name;
        } catch (e) {
            /* ignore */
        }

        const catForm = new ActionFormData()
            .title(`Interacciones`)
            .body(`Entidad: ${displayName}\n§rSelecciona una categoría:`);
        for (const g of cfg) catForm.button(g.category);

        // Mostrar la UI fuera del contexto restringido
        system.run(() => {
            debugWarn(
                "playerInteractWithEntity",
                `showing category form to ${player.name}`
            );
            catForm
                .show(player)
                .then((catRes) => {
                    debugWarn(
                        "playerInteractWithEntity",
                        `category result: ${JSON.stringify(catRes)}`
                    );
                    if (!catRes || catRes.canceled) {
                        debugWarn(
                            "playerInteractWithEntity",
                            `player canceled category`,
                            "blue"
                        );
                        return;
                    }
                    const catIndex =
                        typeof catRes.selection === "number"
                            ? catRes.selection
                            : -1;
                    if (catIndex < 0) return;
                    const group = cfg[catIndex];
                    if (!group || !group.entries) return;

                    const entryForm = new ActionFormData()
                        .title(`${group.category}`)
                        .body(
                            `Entidad: ${displayName}\n§rSelecciona una acción:`
                        );
                    for (const e of group.entries) entryForm.button(e.label);

                    debugWarn(
                        "playerInteractWithEntity",
                        `showing entry form to ${player.name}`
                    );
                    entryForm
                        .show(player)
                        .then((entryRes) => {
                            debugWarn(
                                "playerInteractWithEntity",
                                `entry result: ${JSON.stringify(entryRes)}`
                            );
                            if (!entryRes || entryRes.canceled) {
                                debugWarn(
                                    "playerInteractWithEntity",
                                    `player canceled entry`,
                                    "blue"
                                );
                                return;
                            }
                            const entryIndex =
                                typeof entryRes.selection === "number"
                                    ? entryRes.selection
                                    : -1;
                            if (entryIndex < 0) return;
                            const entry = group.entries[entryIndex];
                            if (!entry || !entry.event) return;

                            try {
                                entity.triggerEvent(entry.event);
                                debugWarn(
                                    "playerInteractWithEntity",
                                    `triggered triggerEvent ${entry.event} on ${entity.typeId}`,
                                    "green"
                                );
                            } catch (err) {
                                debugWarn(
                                    "playerInteractWithEntity",
                                    `triggerEvent error ${err}`,
                                    "red"
                                );
                                try {
                                    if (entity.runCommand)
                                        entity.runCommand(
                                            `event entity @s "${entry.event}"`
                                        );
                                    debugWarn(
                                        "playerInteractWithEntity",
                                        `triggered runCommand ${entry.event} on ${entity.typeId}`,
                                        "green"
                                    );
                                } catch (e) {
                                    debugWarn(
                                        "playerInteractWithEntity",
                                        `runCommand fallback failed: ${e}`,
                                        "red"
                                    );
                                }
                            }
                        })
                        .catch((e) =>
                            debugWarn(
                                "playerInteractWithEntity",
                                `GUI show entry error: ${e}`
                            )
                        );
                })
                .catch((e) =>
                    debugWarn(
                        "playerInteractWithEntity",
                        `GUI show category error: ${e}`
                    )
                );
        });
    } catch (err) {
        debugWarn("playerInteractWithEntity", `GUI error: ${err}`, "red");
    }
});
