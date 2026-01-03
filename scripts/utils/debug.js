import { world } from "@minecraft/server";

// =====================
// Configuración global
// =====================
export const DEBUG = false;          // Mensajes en el chat
export const DEBUG_CONSOLE = false;  // Mensajes en consola

/*
Filtros por archivo/módulo
- []            → no muestra nada
- ["*"]         → muestra todo
- ["toggle_system", "commandMenu"]
*/
export const DEBUG_MODULES = [
    // "commandMenu",
    // "applySystems",
    // "toggle_system",
    // "toggle_entity",
    "dynamicProperties"
];

function isModuleEnabled(module) {
    return DEBUG_MODULES.includes("*") || DEBUG_MODULES.includes(module);
}

// =====================
// Utilidades de color
// =====================

// Colores para chat (Minecraft §)
const CHAT_COLORS = {
    gray: "§7",
    red: "§c",
    green: "§a",
    yellow: "§e",
    blue: "§9",
    aqua: "§b",
    magenta: "§d",
    white: "§f",
    dark: "§8",
    reset: "§r"
};

// Colores para consola (ANSI)
const CONSOLE_COLORS = {
    gray: 90,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37
};

// =====================
// Consola (console.log)
// =====================
export function debugMessage(module, message, color = "gray") {
    if (!DEBUG_CONSOLE || !isModuleEnabled(module)) return;

    const c = CONSOLE_COLORS[color.toLowerCase()] ?? CONSOLE_COLORS.gray;
    console.log(`\x1b[${c}m[DEBUG:${module}] ${message}\x1b[0m`);
}

// Alias útil si quieres semántica distinta
export function debugWarn(module, message, color = "yellow") {
    if (!DEBUG_CONSOLE || !isModuleEnabled(module)) return;

    const c = CONSOLE_COLORS[color.toLowerCase()] ?? CONSOLE_COLORS.yellow;
    console.warn(`\x1b[${c}m[WARN:${module}] ${message}\x1b[0m`);
}

// =====================
// Chat del juego
// =====================
export function debugChat(module, message, color = "gray") {
    if (!DEBUG || !isModuleEnabled(module)) return;

    const c = CHAT_COLORS[color.toLowerCase()] ?? CHAT_COLORS.gray;
    world.sendMessage(
        `${CHAT_COLORS.dark}[DEBUG:${module}]${CHAT_COLORS.reset} ${c}${message}${CHAT_COLORS.reset}`
    );
}
