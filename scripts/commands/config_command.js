// scripts/commands/config_command.js
import { system, CustomCommandStatus, CustomCommandSource, CommandPermissionLevel } from "@minecraft/server";
import { buildAndShowMenu } from "../gui/commandMenu/menu.js";

system.beforeEvents.startup.subscribe((init) => {
    const cmd = {
        name: "scpd:config",
        description: "Abre el panel de configuración de SCPDystopia (interfaz)",
        permissionLevel: CommandPermissionLevel.Any,
        cheatsRequired: false,
    };

    try {
        init.customCommandRegistry.registerCommand(cmd, (origin) => {
            try {
                // Solo permitir ejecución por entidad (jugador)
                if (origin.sourceType !== CustomCommandSource.Entity || !origin.sourceEntity) {
                    return {
                        status: CustomCommandStatus.Failure,
                        message: "Este comando solo puede ser ejecutado por un jugador."
                    };
                }

                // Mostrar el menú al jugador que ejecutó el comando
                try {
                    buildAndShowMenu(origin.sourceEntity);
                } catch (e) {
                    console.warn("Error mostrando menú desde scpd:config:", e);
                    return {
                        status: CustomCommandStatus.Failure,
                        message: "Error abriendo el menú de configuración. Revisa la consola."
                    };
                }

                return {
                    status: CustomCommandStatus.Success,
                    message: "Abriendo menú de configuración..."
                };
            } catch (e) {
                console.warn("scpd:config handler error:", e);
                return { status: CustomCommandStatus.Failure, message: "Error interno al ejecutar el comando." };
            }
        });
    } catch (e) {
        console.warn("Error registrando scpd:config:", e);
    }
});
