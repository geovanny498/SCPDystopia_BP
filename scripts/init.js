// init.js

// Configuración de depuración
// const DEBUG_MODE = true; // true = se conecta al depurador, false = no

import { world } from "@minecraft/server";

import "./components/maxDamage.js";
import "./components/killTarget.js";
import "./components/removeTarget.js";
import "./utils/weapons.js";
import "./commands/register_systems.js";
// import "./commands/toggle_system.js"

// Inicializa la lógica principal
import "./main.js";

// if (DEBUG_MODE) {
//     world.afterEvents.playerSpawn.subscribe((event) => {
//         const player = event.player;
//         if (!player) return;

//         try {
//             // Ejecuta el comando            
//             world.sendMessage(`[DEBUG] Depurador conectado para ${player.name}`);

//             player.runCommand("script debugger connect");
//             player.runCommand("say hola");

//             // Mensaje en chat
//             // world.sendMessage(`[DEBUG] Error al conectar depurador: ${err}`);

//             // Mensaje en consola

//         } catch (err) {
//             world.sendMessage(`[DEBUG] Error al conectar depurador: ${err}`);

//             console.warn(`[DEBUG] Error al conectar depurador: ${err}`);

//         }
//     });
// }
