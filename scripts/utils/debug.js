// utils/debug.js
import { world } from "@minecraft/server";

export const DEBUG = false; // Cambia a true para activar mensajes en el chat
export const DEBUG_CONSOLE = false;

export function debugMessage(message) {
    if (DEBUG) {
        world.sendMessage(`DEBUG: ${message}`);
    }
}

export function debugWarn(message, color = "yellow") {
    if (DEBUG_CONSOLE) {
        let colorCode;

        switch (color.toLowerCase()) {
            case "red":
                colorCode = 31; // Rojo
                break;
            case "green":
                colorCode = 32; // Verde
                break;
            case "blue":
                colorCode = 34; // Azul
                break;
            case "cyan":
                colorCode = 36; // Cian
                break;
            case "magenta":
                colorCode = 35; // Magenta
                break;
            default:
                colorCode = 33; // Amarillo por defecto
        }

        // Usamos la secuencia de escape ANSI para cambiar el color
        console.warn(`\x1b[${colorCode}mDEBUG: ${message}\x1b[0m`);
    }
}
