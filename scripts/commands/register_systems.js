// commands/register_systems.js
import { registerSoldierSystem } from "./toggle_system.js";
import { registerTeleportSystem } from "./toggle_teleport.js";
import { system, world, CustomCommandParamType, CustomCommandStatus, CommandPermissionLevel, CustomCommandSource } from "@minecraft/server";
import { systemStates } from "./toggle_system.js";
import { applySystemToAll } from "./applySystems.js";
import { systems as menuSystems, ControlType } from "../gui/commandMenu/menu_config.js";
import { resetAllSystems } from "./worldSave.js";
import { resetMenuSystemStates } from "../gui/commandMenu/menu_events.js";
import { applySystemsToAll } from "../gui/commandMenu/menu_state.js";

// En deshuso: los sistemas ahora se registran automáticamente desde menu_config.js
// Sistema de spawn
// registerSoldierSystem({
//     name: "spawn",
//     command: "spawn",
//     statusCommand: "status_spawn",
//     desc: "Activa o desactiva el spawn de soldados",
//     component: "minecraft:behavior.summon_entity",
//     startEvent: "humanoid:start_spawn_soldiers",
//     stopEvent: "humanoid:stop_spawn_soldiers",
//     labelOn: "Spawn activado",
//     labelOff: "Spawn desactivado",
// });

// // Sistema de barra de vida
// registerSoldierSystem({
//     name: "health",
//     command: "health",
//     statusCommand: "status_health",
//     desc: "Activa o desactiva la barra de vida de los soldados",
//     component: "minecraft:boss",
//     startEvent: "humanoid:show_boss_bar",
//     stopEvent: "humanoid:dont_show_boss_bar",
//     labelOn: "Barra de vida activada",
//     labelOff: "Barra de vida desactivada",
// });

// // Sistema de teleport
// registerTeleportSystem({
//     name: "teleport",
//     command: "teleport",
//     statusCommand: "status_teleport",
//     desc: "Controla el teleport de soldados",
//     component: "minecraft:teleport",
//     events: {
//         start: "humanoid:start_teleport",
//         stop: "humanoid:stop_teleport",
//         start_near: "humanoid:start_teleport_near",
//         stop_near: "humanoid:stop_teleport_near", // No se usa actualmente
//     }
// });

// autoUpdate flags y comando de toggle removed — el sistema ahora aplica cambios de forma explícita mediante applySystemToAll



system.beforeEvents.startup.subscribe((init) => {
    const setCmd = {
        name: "scpd:set_world_props",
        description: "Configura automáticamente las propiedades de SCPDystopia y actualiza systemStates",
        permissionLevel: CommandPermissionLevel.Any,
        cheatsRequired: false,
    };

    try {
        init.customCommandRegistry.registerCommand(setCmd, (origin) => {
            const defaultConfigs = {
                health: {
                    foundation: { enable: true, includeSpecial: false },
                    chaos: { enable: true, includeSpecial: true },
                },
                spawn: {
                    foundation: { enable: true, includeSpecial: false },
                    chaos: { enable: true, includeSpecial: true },
                },
                teleport: {
                    foundation: { mode: "normal", includeSpecial: "false" },
                    chaos: { mode: "normal", includeSpecial: "normal" },
                }
            };

            // Guardar en world properties y actualizar systemStates
            for (const [systemName, cfg] of Object.entries(defaultConfigs)) {
                const id = `scpd_system_${systemName}`;
                world.setDynamicProperty(id, JSON.stringify(cfg));

                // Actualizar systemStates si existe
                if (systemName === "teleport") {
                    if (!systemStates.teleport) systemStates.teleport = {};
                    systemStates.teleport.foundation = { ...cfg.foundation };
                    systemStates.teleport.chaos = { ...cfg.chaos };
                } else {
                    if (!systemStates[systemName]) systemStates[systemName] = {};
                    systemStates[systemName].foundation = { ...cfg.foundation };
                    systemStates[systemName].chaos = { ...cfg.chaos };
                }
            }

            // console.log("[SCPDystopia] Propiedades dinámicas configuradas automáticamente:", Object.keys(defaultConfigs).join(", "));

            // Aplicar los sistemas actualizados inmediatamente (usar dimensión del ejecutor si existe)
            try {
                const dim = (origin && origin.sourceType === CustomCommandSource.Entity && origin.sourceEntity) ?
                    origin.sourceEntity.dimension :
                    ["overworld", "nether", "the_end"].map(id => world.getDimension(id)).filter(Boolean);;
                for (const sysName of Object.keys(defaultConfigs)) {
                    applySystemToAll(sysName, dim);
                }
            } catch (e) { /* no bloquear */ }

            // Retornar respuesta
            return {
                status: CustomCommandStatus.Success,
                message: "Propiedades de SCPDystopia aplicadas automáticamente y systemStates actualizados"
            };
        });
    } catch (e) {
        console.warn("Error registrando scpd:set_world_props:", e);
    }
});


// --- Comando check ---
system.beforeEvents.startup.subscribe((init) => {
    const checkCmd = {
        name: "scpd:check_world_props",
        description: "Muestra todas las propiedades dinámicas del mundo de forma legible",
        permissionLevel: CommandPermissionLevel.Any,
        cheatsRequired: false,
    };

    try {
        init.customCommandRegistry.registerCommand(checkCmd, (origin) => {
            const ids = world.getDynamicPropertyIds();

            // Log en consola de TODAS las propiedades dinámicas
            console.log(`[SCPDystopia] Propiedades dinámicas encontradas: ${ids.length > 0 ? ids.join(", ") : "ninguna"}`);

            // Obtener dinámicamente todos los sistemas de menu_config.js
            const systemIds = Object.keys(menuSystems);
            const scpdProps = systemIds.map(sysId => `scpd_system_${sysId}`);

            function formatSystemCompact(sysId, sysConfig, state) {
                if (!state || !state.foundation || !state.chaos)
                    return { name: sysConfig.displayName, foundationNormal: "§7N/A§r", foundationSpecial: "§7N/A§r", chaosNormal: "§7N/A§r", chaosSpecial: "§7N/A§r" };

                function formatFactionCompact(data) {
                    const isDropdown = sysConfig.controlType === ControlType.DROPDOWN;

                    if (isDropdown) {
                        const normalMode = data.mode === "false" ? "§cOFF§r" : `§a${data.mode}§r`;
                        const specialMode = data.includeSpecial === "false" ? "§cOFF§r" : `§a${data.includeSpecial}§r`;
                        return { normal: normalMode, special: specialMode };
                    } else {
                        const enabled = data.enable ? "§aON§r" : "§cOFF§r";
                        const specials = data.includeSpecial ? "§aON§r" : "§cOFF§r";
                        return { normal: enabled, special: specials };
                    }
                }

                const foundationData = formatFactionCompact(state.foundation);
                const chaosData = formatFactionCompact(state.chaos);

                return {
                    name: sysConfig.displayName,
                    foundationNormal: foundationData.normal,
                    foundationSpecial: foundationData.special,
                    chaosNormal: chaosData.normal,
                    chaosSpecial: chaosData.special
                };
            }

            // Recopilar datos de todos los sistemas
            const systemsData = [];
            for (const sysId of systemIds) {
                const id = `scpd_system_${sysId}`;
                const sysConfig = menuSystems[sysId];
                const raw = world.getDynamicProperty(id);
                let state;
                try {
                    state = JSON.parse(raw ?? "{}");
                } catch {
                    state = {};
                }

                systemsData.push(formatSystemCompact(sysId, sysConfig, state));
            }

            // Función para calcular longitud sin códigos de formato
            function getVisibleLength(str) {
                return str.replace(/§[0-9a-fk-or]/gi, '').length;
            }

            // Función para hacer padding considerando códigos de formato
            function padEndVisible(str, targetLength) {
                const visibleLen = getVisibleLength(str);
                const padding = targetLength - visibleLen;
                return str + ' '.repeat(Math.max(0, padding));
            }

            // Crear tabla en columnas (2 columnas) con ancho fijo
            const colsPerRow = 2;
            const colWidth = 35;
            const separator = "    ";
            let message = `§e§l[SCPDystopia] Propiedades del mundo§r\n§7${"─".repeat(80)}§r\n`;
            let consoleOutput = `[SCPDystopia] Propiedades del mundo:\n${"─".repeat(80)}\n`;

            for (let i = 0; i < systemsData.length; i += colsPerRow) {
                const row = systemsData.slice(i, i + colsPerRow);

                // Encabezados de sistemas
                let headerLine = "";
                let consoleHeaderLine = "";
                for (let j = 0; j < colsPerRow; j++) {
                    const sys = row[j];
                    if (sys) {
                        const name = sys.name.substring(0, colWidth - 2);
                        headerLine += padEndVisible(`§l${name}§r`, colWidth - 6);
                        consoleHeaderLine += `${name.padEnd(colWidth)}`;
                    }
                    if (j < colsPerRow - 1) {
                        headerLine += separator;
                        consoleHeaderLine += separator;
                    }
                }
                message += `${headerLine}\n`;
                consoleOutput += `${consoleHeaderLine}\n`;

                // Fila Foundation - Normales
                let foundationNormalLine = "";
                let consoleFoundationNormalLine = "";
                for (let j = 0; j < colsPerRow; j++) {
                    const sys = row[j];
                    if (sys) {
                        const text = `§6F.Normal:§r ${sys.foundationNormal}`;
                        foundationNormalLine += padEndVisible(text, colWidth);
                        consoleFoundationNormalLine += `F.Normal: ${sys.foundationNormal}`.padEnd(colWidth);
                    }
                    if (j < colsPerRow - 1) {
                        foundationNormalLine += separator;
                        consoleFoundationNormalLine += separator;
                    }
                }
                message += `${foundationNormalLine}\n`;
                consoleOutput += `${consoleFoundationNormalLine}\n`;

                // Fila Foundation - Especiales
                let foundationSpecialLine = "";
                let consoleFoundationSpecialLine = "";
                for (let j = 0; j < colsPerRow; j++) {
                    const sys = row[j];
                    if (sys) {
                        const text = `§6F.Special:§r ${sys.foundationSpecial}`;
                        foundationSpecialLine += padEndVisible(text, colWidth);
                        consoleFoundationSpecialLine += `F.Special: ${sys.foundationSpecial}`.padEnd(colWidth);
                    }
                    if (j < colsPerRow - 1) {
                        foundationSpecialLine += separator;
                        consoleFoundationSpecialLine += separator;
                    }
                }
                message += `${foundationSpecialLine}\n`;
                consoleOutput += `${consoleFoundationSpecialLine}\n`;

                // Fila Chaos - Normales
                let chaosNormalLine = "";
                let consoleChaosNormalLine = "";
                for (let j = 0; j < colsPerRow; j++) {
                    const sys = row[j];
                    if (sys) {
                        const text = `§5C.Normal:§r ${sys.chaosNormal}`;
                        chaosNormalLine += padEndVisible(text, colWidth);
                        consoleChaosNormalLine += `C.Normal: ${sys.chaosNormal}`.padEnd(colWidth);
                    }
                    if (j < colsPerRow - 1) {
                        chaosNormalLine += separator;
                        consoleChaosNormalLine += separator;
                    }
                }
                message += `${chaosNormalLine}\n`;
                consoleOutput += `${consoleChaosNormalLine}\n`;

                // Fila Chaos - Especiales
                let chaosSpecialLine = "";
                let consoleChaosSpecialLine = "";
                for (let j = 0; j < colsPerRow; j++) {
                    const sys = row[j];
                    if (sys) {
                        const text = `§5C.Special:§r ${sys.chaosSpecial}`;
                        chaosSpecialLine += padEndVisible(text, colWidth);
                        consoleChaosSpecialLine += `C.Special: ${sys.chaosSpecial}`.padEnd(colWidth);
                    }
                    if (j < colsPerRow - 1) {
                        chaosSpecialLine += separator;
                        consoleChaosSpecialLine += separator;
                    }
                }
                message += `${chaosSpecialLine}\n`;
                consoleOutput += `${consoleChaosSpecialLine}\n`;

                // Separador entre filas
                if (i + colsPerRow < systemsData.length) {
                    message += `§7${"─".repeat(80)}§r\n`;
                    consoleOutput += `${"─".repeat(80)}\n`;
                }
            }

            message += `§7${"─".repeat(80)}§r`;
            consoleOutput += `${"─".repeat(80)}`;

            console.log(consoleOutput);
            world.sendMessage(message);

            return {
                status: CustomCommandStatus.Success,
                message: "Propiedades mostradas en consola y chat"
            };
        });
    } catch { }
});

// --- Comando reset ---
system.beforeEvents.startup.subscribe((init) => {
    try {
        init.customCommandRegistry.registerCommand({
            name: "scpd:reset_system",
            description: "Resetea un sistema específico o todos",
            permissionLevel: CommandPermissionLevel.Any,
            cheatsRequired: false
        }, (origin, system_name) => {
            // 1. Resetear propiedades dinámicas y systemStates (toggle_system.js)
            resetAllSystems(systemStates);

            // 2. Reiniciar estados del menú (limpia memoria y recarga defaults)
            resetMenuSystemStates();

            // 3. Aplicar los sistemas reseteados a todas las entidades
            // Usar system.run() para evitar el contexto restringido del comando
            system.run(() => {
                // Obtener dimensión del ejecutor si existe, sino aplicar en todas
                const dimension = (origin && origin.sourceType === CustomCommandSource.Entity && origin.sourceEntity) ?
                    origin.sourceEntity.dimension :
                    null;

                const systemIds = Object.keys(menuSystems);
                applySystemsToAll(systemIds, dimension);
            });

            return { status: CustomCommandStatus.Success, message: system_name ? `${system_name} reseteado` : "Todos los sistemas reseteados y aplicados" };
        });
    } catch { }
});
