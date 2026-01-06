// scripts\gui\gui.js
import { world, system, EquipmentSlot } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import config from "./config.js";
import { debugWarn } from "../utils/debug.js";

// Helpers de sistema/ids para filtrado por `config.global_rules`.
function makeSystemId(cat) {
    if (!cat) return null;
    if (cat.id) return String(cat.id);
    const name = String(cat.category || "").toLowerCase();
    return `auto:${name.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "")}`;
}

function isAllowedByRule(sysId, typeId) {
    if (!sysId) return true;
    if (!config.global_rules || !config.global_rules[sysId]) return true;
    const rule = config.global_rules[sysId] || {};
    const mode = rule.mode;
    const list = Array.isArray(rule.list) ? rule.list : [];
    const inList = list.includes(typeId);
    if (mode === "whitelist") return inList;
    if (mode === "blacklist") return !inList;
    return true;
}

function shouldIncludeCategoryForEntity(cat, typeId) {
    const sysId = makeSystemId(cat);
    return isAllowedByRule(sysId, typeId);
}

/**
 * Devuelve las categorías separadas en:
 * - specific: categorías específicas de la entidad
 * - global: categorías globales
 * - merged: orden final según insertAt / replace
 */
function getConfigForEntity(typeId) {
    const globalCats =
        config.global && Array.isArray(config.global.categories)
            ? [...config.global.categories]
            : [];


    // Resolver si la entidad está permitida
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
        allowed = entVal.enabled !== undefined ? Boolean(entVal.enabled) : true;
    } else {
        allowed = Boolean(entVal);
    }

    if (!allowed) {
        debugWarn(
            "playerInteractWithEntity",
            `menu blocked by config.entities[${groupName}].${typeId} = ${JSON.stringify(entVal)}`,
            "blue"
        );
        return null;
    }

    const spec = config.specific && config.specific[typeId];
    const specificCats = spec && Array.isArray(spec.categories)
        ? [...spec.categories]
        : [];

    // Aplicar filtrado a las categorías globales según `global_rules`.
    // Para categorías que apuntan a `submenu`, no bloqueamos la categoría
    // salvo que la categoría principal tenga su propia `id` denegada o
    // todas las categorías del submenu queden filtradas.
    const filteredGlobalCats = [];
    for (const c of globalCats) {
        if (c && c.submenu) {
            // Si la categoría principal tiene id y está denegada, excluirla
            if (c.id && !isAllowedByRule(c.id, typeId)) continue;

            const submenuCfg = config.submenus && config.submenus[c.submenu];
            const submenuCats = (submenuCfg && Array.isArray(submenuCfg.categories)) ? submenuCfg.categories : [];
            const filteredSub = submenuCats.filter((sc) => shouldIncludeCategoryForEntity(sc, typeId));
            if (!filteredSub.length) continue; // submenu vacío -> ocultar la categoría

            // mantener la categoría (no modificar objeto original)
            filteredGlobalCats.push({ ...c });
        } else {
            if (shouldIncludeCategoryForEntity(c, typeId)) filteredGlobalCats.push({ ...c });
        }
    }

    let merged = [];

    if (spec && spec.replace) {
        merged = [...specificCats];
    } else if (specificCats.length) {
        const insertAt = spec.insertAt === "start" ? "start" : "end";
        merged =
            insertAt === "start"
                ? specificCats.concat(filteredGlobalCats)
                : filteredGlobalCats.concat(specificCats);
    } else {
        merged = [...filteredGlobalCats];
    }

    debugWarn(
        "playerInteractWithEntity",
        `resolved categories for ${typeId}: specific=${specificCats.length}, global=${globalCats.length}, merged=${merged.length}`
    );

    return {
        specific: specificCats,
        global: spec && spec.replace ? [] : filteredGlobalCats,
        merged
    };
}

function itemMatches(mainId, opener) {
    if (!mainId || !opener) return false;
    if (opener.includes(":")) return mainId === opener;

    const parts = mainId.split(":");
    const short = parts.length > 1 ? parts[1] : parts[0];
    return short === opener || mainId === opener || mainId.endsWith(`:${opener}`);
}

world.beforeEvents.playerInteractWithEntity.subscribe((ev) => {
    try {
        const player = ev.player;
        const entity = ev.target;

        debugWarn(
            "playerInteractWithEntity",
            `handler fired player=${player?.name ?? "?"} target=${entity?.typeId ?? "?"}`
        );

        if (!player || !entity) return;

        // Determinar facción
        let entGroup = null;
        if (config.entities) {
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
            (entGroup && config.openItem?.[entGroup]) ||
            config.openItem?.default ||
            "lc:dt_commander";

        try {
            const mainhand = player
                .getComponent("equippable")
                ?.getEquipment(EquipmentSlot.Mainhand);

            const mainId = mainhand?.typeId ?? mainhand?.id ?? null;

            debugWarn(
                "playerInteractWithEntity",
                `player mainhand=${mainId}, opener=${openerItem}`
            );

            if (!itemMatches(mainId, openerItem)) {
                debugWarn(
                    "playerInteractWithEntity",
                    `menu blocked: wrong opener`,
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

        let displayName = typeId;
        try {
            if (entity.nameTag) displayName = entity.nameTag;
            else if (entity.name) displayName = entity.name;
        } catch { }

        const soldierName = entity.nameTag
            ? `${entity.nameTag}§r`
            : `§b${displayName}§r`;

        const catForm = new ActionFormData()
            .title("SCPDystopia | Interacciones")
            .body(`§7Unidad:§r ${soldierName}`);

        /** 
         * Mapa real de botones → categoría
         * IMPORTANTE: headers/dividers NO cuentan como botones
         */
        const categoryButtonMap = [];

        // ¿Específicas arriba?
        if (cfg.specific.length && cfg.merged[0] === cfg.specific[0]) {
            catForm.label("§8- Opciones específicas -§r");
            for (const cat of cfg.specific) {
                catForm.button(cat.category);
                categoryButtonMap.push(cat);
            }

            if (cfg.global.length) {
                catForm.divider();
                catForm.label("§7- Opciones globales -§r");
                for (const cat of cfg.global) {
                    catForm.button(cat.category);
                    categoryButtonMap.push(cat);
                }
            }
        } else {
            // Globales primero
            if (cfg.global.length) {
                catForm.label("§7- Opciones globales -§r");
                for (const cat of cfg.global) {
                    catForm.button(cat.category);
                    categoryButtonMap.push(cat);
                }
            }

            if (cfg.specific.length) {
                catForm.divider();
                catForm.label("§8- Opciones específicas -§r");
                for (const cat of cfg.specific) {
                    catForm.button(cat.category);
                    categoryButtonMap.push(cat);
                }
            }
        }

        system.run(() => {
            debugWarn(
                "playerInteractWithEntity",
                `showing category form to ${player.name}`
            );

            catForm.show(player).then((catRes) => {
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

                const index =
                    typeof catRes.selection === "number"
                        ? catRes.selection
                        : -1;

                const group = categoryButtonMap[index];
                if (!group) return;

                // Si la categoría apunta a un submenu, abrir el submenu
                if (group.submenu) {
                    const submenuId = group.submenu;
                    const submenuCfg = config.submenus && config.submenus[submenuId];
                    debugWarn(
                        "playerInteractWithEntity",
                        `opening submenu ${submenuId} for ${typeId}`
                    );

                    if (!submenuCfg || !Array.isArray(submenuCfg.categories) || !submenuCfg.categories.length) {
                        debugWarn(
                            "playerInteractWithEntity",
                            `submenu ${submenuId} not found or empty for ${typeId}`,
                            "blue"
                        );
                        return;
                    }

                    const submenuForm = new ActionFormData()
                        .title(group.category)
                        .body(`Entidad: ${displayName}§r`);

                    // Filtrar las categorías del submenu según global_rules y entidad
                    const submenuButtonMap = [];
                    const rawSubCats = Array.isArray(submenuCfg.categories) ? submenuCfg.categories : [];
                    const filteredSubCats = rawSubCats.filter((sc) => shouldIncludeCategoryForEntity(sc, typeId));

                    if (!filteredSubCats.length) {
                        debugWarn(
                            "playerInteractWithEntity",
                            `submenu ${submenuId} empty after filtering for ${typeId}`,
                            "blue"
                        );
                        return;
                    }

                    for (const subCat of filteredSubCats) {
                        submenuForm.button(subCat.category);
                        submenuButtonMap.push(subCat);
                    }

                    debugWarn(
                        "playerInteractWithEntity",
                        `showing submenu ${submenuId} to ${player.name}`
                    );

                    submenuForm.show(player).then((subRes) => {
                        debugWarn(
                            "playerInteractWithEntity",
                            `submenu result: ${JSON.stringify(subRes)}`
                        );

                        if (!subRes || subRes.canceled) {
                            debugWarn(
                                "playerInteractWithEntity",
                                `player canceled submenu`,
                                "blue"
                            );
                            return;
                        }

                        const subIndex = typeof subRes.selection === "number" ? subRes.selection : -1;
                        const subCategory = submenuButtonMap[subIndex];
                        if (!subCategory || !subCategory.entries) return;

                        // Abrir el formulario de entries usando la categoría del submenu seleccionada
                        const entryForm = new ActionFormData()
                            .title(subCategory.category)
                            .body(`Entidad: ${displayName}\n§rSelecciona una acción:`);

                        for (const e of subCategory.entries) entryForm.button(e.label);

                        debugWarn(
                            "playerInteractWithEntity",
                            `showing entry form (submenu -> ${subCategory.category}) to ${player.name}`
                        );

                        entryForm.show(player).then((entryRes) => {
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

                            const entry = subCategory.entries[entryIndex];
                            if (!entry || !entry.event) return;

                            try {
                                entity.triggerEvent(entry.event);
                                world.sendMessage(
                                    `§8[§aMENU§8] §7${player.name} configuró a ${soldierName} §7-> §e${subCategory.category}§7: §f${entry.label}`
                                );

                                debugWarn(
                                    "playerInteractWithEntity",
                                    `triggered event ${entry.event}`,
                                    "green"
                                );
                            } catch (e) {
                                debugWarn(
                                    "playerInteractWithEntity",
                                    `triggerEvent failed: ${e}`,
                                    "red"
                                );
                            }
                        });
                    });

                    return;
                }
                // Flujo normal: categoría con entries
                if (group.entries) {
                    const entryForm = new ActionFormData()
                        .title(group.category)
                        .body(`Entidad: ${displayName}\n§rSelecciona una acción:`);

                    for (const e of group.entries) entryForm.button(e.label);

                    debugWarn(
                        "playerInteractWithEntity",
                        `showing entry form (${group.category}) to ${player.name}`
                    );

                    entryForm.show(player).then((entryRes) => {
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

                        const entry = group.entries[entryIndex];
                        if (!entry || !entry.event) return;

                        try {
                            entity.triggerEvent(entry.event);
                            world.sendMessage(
                                `§8[§aMENU§8] §7${player.name} configuró a ${soldierName} §7-> §e${group.category}§7: §f${entry.label}`
                            );

                            debugWarn(
                                "playerInteractWithEntity",
                                `triggered event ${entry.event}`,
                                "green"
                            );
                        } catch (e) {
                            debugWarn(
                                "playerInteractWithEntity",
                                `triggerEvent failed: ${e}`,
                                "red"
                            );
                        }
                    });
                }
            });
        });
    } catch (err) {
        debugWarn("playerInteractWithEntity", `GUI error: ${err}`, "red");
    }
});
