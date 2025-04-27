// utils/debug.js
import { world } from "@minecraft/server";

export const DEBUG = false; // Cambia a true para activar mensajes en el chat
export const DEBUG_CONSOLE = false;

export function debugMessage(message) {
    if (DEBUG) {
        world.sendMessage(`DEBUG: ${message}`);
    }
}

export function debugWarn(message) {
    if (DEBUG_CONSOLE) {
        console.warn(`DEBUG: ${message}`);
    }
}
