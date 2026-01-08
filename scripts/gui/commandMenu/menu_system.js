// scripts/gui/commandMenu/menu_system.js
import { world, system } from "@minecraft/server";
import { debugWarn } from "../../utils/debug.js";

import { buildSystemForm, parseSystemFormValues, getConfirmationMessage } from "./menu_builder.js";
import { loadSystemStates, saveSystemStates, applySystemsToAll } from "./menu_state.js";

/**
 * Muestra el formulario de configuración para uno o más sistemas
 * @param {Player} player 
 * @param {Array<Object>} systems - Array de configuraciones de sistemas
 * @param {boolean} isAllCategory - Si se está configurando la categoría "all"
 */
export function showSystemMenu(player, systems, isAllCategory = false) {
    try {
        if (!systems || systems.length === 0) {
            debugWarn("commandMenu", "No hay sistemas para mostrar", "red");
            return;
        }

        // 1. Cargar estados actuales de los sistemas
        const systemIds = systems.map(s => s.id);
        const loadedStates = loadSystemStates(systemIds);

        // 2. Construir el formulario
        const form = buildSystemForm(systems, loadedStates);

        // 3. Mostrar el formulario
        system.run(() => {
            form.show(player).then(res => {
                debugWarn("commandMenu", `System menu result: ${JSON.stringify(res)}`, "cyan");

                // Si el usuario canceló, no hacer nada
                if (!res || res.canceled) return;

                const vals = res.formValues;
                debugWarn("commandMenu", `formValues array: ${JSON.stringify(vals)}`, "cyan");

                if (!Array.isArray(vals)) return;

                // 4. Parsear los valores del formulario
                const parsedStates = parseSystemFormValues(systems, vals);
                debugWarn("commandMenu", `Parsed states: ${JSON.stringify(parsedStates)}`, "cyan");

                // 5. Guardar todos los estados
                saveSystemStates(parsedStates);

                // 6. Aplicar todos los sistemas
                applySystemsToAll(systemIds, player.dimension);

                // 7. Mensaje de confirmación
                try {
                    const msg = getConfirmationMessage(player.name, systems, isAllCategory);
                    world.sendMessage(msg);
                } catch (e) {
                    debugWarn("commandMenu", `Error enviando mensaje de confirmacion: ${e}`, "red");
                }
            });
        });
    } catch (e) {
        debugWarn("commandMenu", `Error mostrando menu de sistema: ${e}`, "red");
    }
}
