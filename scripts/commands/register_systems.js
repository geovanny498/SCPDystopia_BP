// commands/register_systems.js
import { registerSoldierSystem } from "./toggle_system.js";
// import { registerTeleportSystem } from "./toggle_teleport.js";
// Sistema de spawn
registerSoldierSystem({
    name: "spawn",
    command: "spawn_soldiers",
    statusCommand: "status_spawn_soldiers",
    desc: "Activa o desactiva el spawn de soldados",
    startEvent: "humanoid:start_spawn_soldiers",
    stopEvent: "humanoid:stop_spawn_soldiers",
    labelOn: "Spawn activado",
    labelOff: "Spawn desactivado",
});

// Sistema de barra de vida
registerSoldierSystem({
    name: "health",
    command: "show_health",
    statusCommand: "status_show_health",
    desc: "Activa o desactiva la barra de vida de los soldados",
    startEvent: "humanoid:show_boss_bar",
    stopEvent: "humanoid:dont_show_boss_bar",
    labelOn: "Barra de vida activada",
    labelOff: "Barra de vida desactivada",
});
