// scripts/commands/toggle_teleport.js
import { system, world, CustomCommandParamType, CustomCommandStatus, CommandPermissionLevel, CustomCommandSource } from "@minecraft/server";
import { saveSystemState, loadSystemState } from "./worldSave.js";
import { allSoldiers, specialSoldiers, systemStates } from "./toggle_system.js";
import { applySystemToAll } from "./applySystems.js";
import { getTeam } from "../utils/teams.js";
import { debugMessage, debugWarn } from "../utils/debug.js";

system.beforeEvents.startup.subscribe((init) => {
    try {
        // Enum para mode
        init.customCommandRegistry.registerEnum("scpd:mode", ["normal", "near", "false"]);

        // Enum para includeSpecialT
        init.customCommandRegistry.registerEnum("scpd:includeSpecialT", ["normal", "near", "false"]);
    } catch { }
});

export function registerTeleportSystem(cfg) {
    // Asegurar estado
    if (!systemStates.teleport) {
        systemStates.teleport = {
            foundation: { mode: "false", includeSpecial: "false" },
            chaos: { mode: "false", includeSpecial: "false" },
        };
    }

    // Cargar estado guardado
    system.run(() => {
        const loaded = loadSystemState("teleport");
        if (loaded) systemStates.teleport = loaded;
    });

    // La lógica de aplicación a entidades se realiza desde applySystems.js

    // Registrar comandos
    system.beforeEvents.startup.subscribe((init) => {
        const toggleCommand = {
            name: `scpd:toggle_${cfg.command}`,
            description: cfg.desc,
            permissionLevel: CommandPermissionLevel.Any,
            cheatsRequired: false,
            optionalParameters: [
                { name: "scpd:faction", type: CustomCommandParamType.Enum }, // foundation | chaos | both
                {
                    name: "scpd:mode",
                    type: CustomCommandParamType.Enum,
                },
                {
                    name: "scpd:includeSpecialT",
                    type: CustomCommandParamType.Enum,
                },
            ],
        };

        init.customCommandRegistry.registerCommand(toggleCommand, (origin, faction, mode, includeSpecialT) => {
            faction = faction ?? "both";
            mode = mode ?? "normal";
            const includeSpecial = includeSpecialT ?? "false";

            const state = systemStates.teleport;
            if (faction === "foundation" || faction === "both") {
                state.foundation.mode = mode;
                state.foundation.includeSpecial = includeSpecial;
            }
            if (faction === "chaos" || faction === "both") {
                state.chaos.mode = mode;
                state.chaos.includeSpecial = includeSpecial;
            }

            saveSystemState("teleport", state);
            // Delegar la aplicación al core (usar la dimensión del ejecutor si es jugador)
            try {
                const dim = (origin && origin.sourceType === CustomCommandSource.Entity && origin.sourceEntity) ?
                    origin.sourceEntity.dimension :
                    ["overworld", "nether", "the_end"].map(id => world.getDimension(id)).filter(Boolean);
                applySystemToAll("teleport", dim);
            } catch (e) { debugWarn("toggle_teleport", `applySystemToAll error: ${e}`); }

            return {
                status: CustomCommandStatus.Success,
                message: `Teleport para ${faction} actualizado: mode=${mode}, especiales=${includeSpecial}`
            };
        });

        // Status
        const statusCommand = {
            name: `scpd:${cfg.statusCommand}`,
            description: `Muestra estado actual del teleport`,
            permissionLevel: CommandPermissionLevel.Any,
            cheatsRequired: false,
            optionalParameters: [{ name: "scpd:faction", type: CustomCommandParamType.Enum }]
        };

        init.customCommandRegistry.registerCommand(statusCommand, (origin, faction) => {
            faction = faction ?? "both";
            const state = systemStates.teleport;

            function formatFaction(name, data) {
                const modeText = data.mode === "false" ? "§c[OFF]§r" : `§a[${data.mode}]§r`;
                const specialText = data.includeSpecial === "false" ? "§c[OFF]§r" : `§a[${data.includeSpecial}]§r`;
                return `§l${name.toUpperCase()}§r\n Modo: ${modeText}\n Especiales: ${specialText}`;
            }

            const parts = [];
            if (faction === "foundation" || faction === "both") parts.push(formatFaction("Foundation", state.foundation));
            if (faction === "chaos" || faction === "both") parts.push(formatFaction("Chaos", state.chaos));

            return { status: CustomCommandStatus.Success, message: `§6Teleport - Estado Actual§r\n\n${parts.join("\n\n")}` };
        });
    });

    // La gestión de entitySpawn/entityLoad/entityRemove la realiza toggle_system.js
}
