// scripts\gui\commandMenu\menu.js
import { world, system } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { saveSystemState, loadSystemState } from "../../commands/worldSave.js";
import { getSystemStates } from "../../commands/toggle_system.js";
import { applySystemToAll } from "../../commands/applySystems.js";

import { debugMessage, debugWarn } from "../../utils/debug.js";

const TELEPORT_CHOICES = ["normal", "near", "false"]; // índice → valor


function getDefaultsFor(systemName) {
    if (systemName === "teleport") {
        return {
            foundation: { mode: "false", includeSpecial: "false" },
            chaos: { mode: "false", includeSpecial: "false" }
        };
    }

    // spawn / health defaults as used por los comandos (cuando no se pasan args)
    return {
        foundation: { enable: false, includeSpecial: false },
        chaos: { enable: false, includeSpecial: false }
    };
}

function loadOrDefault(systemName) {
    const loaded = loadSystemState(systemName);
    if (loaded) return loaded;
    return getDefaultsFor(systemName);
}


function saveAndApply(systemName, state, dimension) {
    try {
        saveSystemState(systemName, state);
        const systemStates = getSystemStates();
        if (!systemStates[systemName]) systemStates[systemName] = {};
        systemStates[systemName].foundation = { ...state.foundation };
        systemStates[systemName].chaos = { ...state.chaos };
        try { applySystemToAll(systemName, dimension); } catch (e) { debugWarn("commandMenu", `applySystemToAll ${systemName} error: ${e}`, "red"); }
    } catch (e) {
        debugWarn("commandMenu", `Error aplicando ${systemName}: ${e}`, "red");
    }
}


function buildAndShowMenu(player) {
    try {
        const spawnState = loadOrDefault("spawn");
        const healthState = loadOrDefault("health");
        const teleportState = loadOrDefault("teleport");

        const form = new ModalFormData()
            .label("Actualizar entidades")
            .title("SCPDystopia - Panel de Comandos")

            // Spawn
            .label("§b§lSistema de Spawn")
            .label("§lFoundation")
            .toggle("Normales", { defaultValue: !!spawnState.foundation.enable })
            .toggle("Especiales", { defaultValue: !!spawnState.foundation.includeSpecial })
            .label("§2§lChaos")
            .toggle("Normales", { defaultValue: !!spawnState.chaos.enable })
            .toggle("Especiales", { defaultValue: !!spawnState.chaos.includeSpecial })
            .divider()
            // Health
            .label("§c§lSistema de barra de vida")
            .label("§lFoundation")
            .toggle("Normales", { defaultValue: !!healthState.foundation.enable })
            .toggle("Especiales", { defaultValue: !!healthState.foundation.includeSpecial })
            .label("§2§lChaos")
            .toggle("Normales", { defaultValue: !!healthState.chaos.enable })
            .toggle("Especiales", { defaultValue: !!healthState.chaos.includeSpecial })
            .divider()
            // Teleport (dropdowns: Normal, Near, OFF)
            .label("§a§lSistema de teleport")
            .label("§lFoundation")
            .dropdown("Normales", ["Normal", "Near", "Off"], { defaultValueIndex: Math.max(0, TELEPORT_CHOICES.indexOf(teleportState.foundation.mode ?? "normal")) })
            .dropdown("Especiales", ["Normal", "Near", "Off"], { defaultValueIndex: Math.max(0, TELEPORT_CHOICES.indexOf(teleportState.foundation.includeSpecial ?? "false")) })
            .label("§2§lChaos")
            .dropdown("Normales", ["Normal", "Near", "Off"], { defaultValueIndex: Math.max(0, TELEPORT_CHOICES.indexOf(teleportState.chaos.mode ?? "normal")) })
            .dropdown("Especiales", ["Normal", "Near", "Off"], { defaultValueIndex: Math.max(0, TELEPORT_CHOICES.indexOf(teleportState.chaos.includeSpecial ?? "false")) });

        // Mostrar el formulario dentro de system.run (patrón usado en gui.js)
        system.run(() => {
            form.show(player).then(res => {
                debugWarn("commandMenu", `menu result: ${JSON.stringify(res)}`, "cyan");
                if (!res || res.canceled) return;
                // ModalFormData returns values en orden
                const vals = res.formValues;
                debugWarn("commandMenu", `formValues array: ${JSON.stringify(vals)}`, "cyan");
                if (!Array.isArray(vals)) return;

                // Algunos elementos (labels/dividers) devuelven null/undefined en formValues.
                // Para evitar desalineación, consumimos solo valores reales (no null/undefined).
                const filtered = vals.filter(v => v !== null && v !== undefined);
                debugWarn("commandMenu", `filtered formValues: ${JSON.stringify(filtered)}`, "cyan");

                let idx = 0;
                const nextVal = () => {
                    const v = filtered[idx];
                    idx += 1;
                    return v;
                };
                // -- Spawn values --
                const newSpawn = { foundation: {}, chaos: {} };
                const spawnF_enable = !!nextVal();
                const spawnF_include = !!nextVal();
                const spawnC_enable = !!nextVal();
                const spawnC_include = !!nextVal();

                newSpawn.foundation.enable = spawnF_enable;
                newSpawn.foundation.includeSpecial = spawnF_include;
                newSpawn.chaos.enable = spawnC_enable;
                newSpawn.chaos.includeSpecial = spawnC_include;

                const newHealth = { foundation: {}, chaos: {} };
                const healthF_enable = !!nextVal();
                const healthF_include = !!nextVal();
                const healthC_enable = !!nextVal();
                const healthC_include = !!nextVal();

                newHealth.foundation.enable = healthF_enable;
                newHealth.foundation.includeSpecial = healthF_include;
                newHealth.chaos.enable = healthC_enable;
                newHealth.chaos.includeSpecial = healthC_include;

                // Dropdowns deben devolver índices (números)
                const rawTeleF_mode = nextVal();
                const rawTeleF_include = nextVal();
                const rawTeleC_mode = nextVal();
                const rawTeleC_include = nextVal();

                const teleFoundationMode = typeof rawTeleF_mode === "number" ? TELEPORT_CHOICES[rawTeleF_mode] : (rawTeleF_mode || "false");
                const teleFoundationInclude = typeof rawTeleF_include === "number" ? TELEPORT_CHOICES[rawTeleF_include] : (rawTeleF_include || "false");
                const teleChaosMode = typeof rawTeleC_mode === "number" ? TELEPORT_CHOICES[rawTeleC_mode] : (rawTeleC_mode || "false");
                const teleChaosInclude = typeof rawTeleC_include === "number" ? TELEPORT_CHOICES[rawTeleC_include] : (rawTeleC_include || "false");

                const newTeleport = {
                    foundation: { mode: teleFoundationMode, includeSpecial: teleFoundationInclude },
                    chaos: { mode: teleChaosMode, includeSpecial: teleChaosInclude }
                };

                debugWarn("commandMenu", `Computed states:\n spawn=${JSON.stringify(newSpawn)}\n health=${JSON.stringify(newHealth)}\n teleport=${JSON.stringify(newTeleport)}`, "cyan");

                // Guardar y aplicar a través del core
                saveSystemState("spawn", newSpawn);
                saveSystemState("health", newHealth);
                saveSystemState("teleport", newTeleport);

                // Actualizar systemStates compartido
                const systemStates = getSystemStates();
                if (!systemStates.spawn) systemStates.spawn = {};
                systemStates.spawn.foundation = { ...newSpawn.foundation };
                systemStates.spawn.chaos = { ...newSpawn.chaos };
                if (!systemStates.health) systemStates.health = {};
                systemStates.health.foundation = { ...newHealth.foundation };
                systemStates.health.chaos = { ...newHealth.chaos };
                if (!systemStates.teleport) systemStates.teleport = {};
                systemStates.teleport.foundation = { ...newTeleport.foundation };
                systemStates.teleport.chaos = { ...newTeleport.chaos };

                // Aplicar via applySystemToAll
                try { applySystemToAll("spawn", player.dimension); } catch (e) { debugWarn("commandMenu", `apply spawn: ${e}`, "red"); }
                try { applySystemToAll("health", player.dimension); } catch (e) { debugWarn("commandMenu", `apply health: ${e}`, "red"); }
                try { applySystemToAll("teleport", player.dimension); } catch (e) { debugWarn("commandMenu", `apply teleport: ${e}`, "red"); }

                // Confirmación en chat (simplificada)
                try {
                    const msg = `§8[MENU] §7Configuración aplicada por ${player.name}. §rUsa §6scpd:check_world_props §rpara ver las opciones aplicadas.`;
                    world.sendMessage(msg);
                } catch (e) {
                    debugWarn("commandMenu", `Error enviando mensaje de confirmación: ${e}`, "red");
                }
            });
        });
    } catch (e) {
        debugWarn("commandMenu", `Error mostrando menú: ${e}`, "red");
    }
}

// Registrar acceso: usar la estrella del nether en la mano principal.

world.afterEvents.itemUse.subscribe(ev => {
    try {
        const player = ev.source; // en eventos itemUse el source es el jugador
        if (!player) return;
        const slot = player.selectedSlotIndex;
        const item = player.getComponent("minecraft:inventory")?.container?.getItem(slot);
        const mainId = item?.typeId ?? item?.id ?? null;
        debugWarn("commandMenu", `main item id=${mainId}`, "cyan");
        if (mainId === "minecraft:nether_star") {
            try { ev.cancel = true; } catch { }
            buildAndShowMenu(player);
        }
    } catch (err) {
        debugWarn("commandMenu", `itemUse handler error: ${err}`, "red");
    }
});


export { buildAndShowMenu };
