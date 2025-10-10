// utils/debug.js
import { world } from "@minecraft/server";

// Configuración global
export const DEBUG = false;         // Mostrar mensajes en el chat
export const DEBUG_CONSOLE = false; // Mostrar mensajes en consola

/* 
Filtros por archivo/módulo
- Si está vacío [], no se muestra nada.
- Si contiene ["*"], se muestran todos.
- Si contiene ["toggle_system"], solo se muestran los de ese módulo.
Ejemplo:
[
    "toggle_spawn",
    "toggle_health",
    "toggle_entity",
    "toggle_system",
    "toggle_teleport"
]
*/
export const DEBUG_MODULES = [
    "toggle_spawn",
    "toggle_health",
    "toggle_teleport"
];

function isModuleEnabled(module) {
    return DEBUG_MODULES.includes("*") || DEBUG_MODULES.includes(module);
}

/**
 * Mensajes de depuración para el chat
 * @param {string} module - nombre del módulo (ej: "toggle_system")
 * @param {string} message - mensaje a mostrar
 */
export function debugMessage(module, message) {
    if (DEBUG && isModuleEnabled(module)) {
        world.sendMessage(`§7[DEBUG:${module}]§r ${message}`);
    }
}

/**
 * Mensajes de advertencia para consola
 * @param {string} module - nombre del módulo
 * @param {string} message - mensaje a mostrar
 * @param {string} color - color opcional ("red", "green", etc.)
 */
export function debugWarn(module, message, color = "yellow") {
    if (DEBUG_CONSOLE && isModuleEnabled(module)) {
        let colorCode;
        switch (color.toLowerCase()) {
            case "red": colorCode = 31; break;
            case "green": colorCode = 32; break;
            case "blue": colorCode = 34; break;
            case "cyan": colorCode = 36; break;
            case "magenta": colorCode = 35; break;
            default: colorCode = 33; // Amarillo
        }
        console.warn(`\x1b[${colorCode}m[DEBUG:${module}] ${message}\x1b[0m`);
    }
}
