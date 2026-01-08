// scripts/gui/commandMenu/menu_category.js
import { system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { debugWarn } from "../../utils/debug.js";

import { getCategoryConfig, getSystemsByCategory } from "./menu_config.js";
import { showSystemMenu } from "./menu_system.js";

/**
 * Muestra el menú de una categoría específica
 * @param {Player} player 
 * @param {string} categoryId 
 */
export function showCategoryMenu(player, categoryId) {
    try {
        const category = getCategoryConfig(categoryId);
        if (!category) {
            debugWarn("commandMenu", `Categoría no encontrada: ${categoryId}`, "red");
            return;
        }

        const systems = getSystemsByCategory(categoryId);

        // Si la categoría es "all", mostrar el formulario combinado
        if (categoryId === "all") {
            showSystemMenu(player, systems, true); // true = isAllCategory
            return;
        }

        // Si solo hay un sistema, ir directo a su formulario
        if (systems.length === 1) {
            showSystemMenu(player, systems, false);
            return;
        }

        // Si hay múltiples sistemas, mostrar menú de selección
        const form = new ActionFormData()
            .title(`${category.displayName}`);

        // Solo agregar body si hay descripción
        if (category.description) {
            form.body(`§7${category.description}\n\n§7Selecciona un sistema para configurar:`);
        } else {
            form.body("§7Selecciona un sistema para configurar:");
        }

        // Agregar botones para cada sistema
        systems.forEach(sys => {
            // Si la descripción está vacía, no agregar salto de línea
            const buttonText = sys.description
                ? `${sys.displayName}\n§r§7${sys.description}`
                : sys.displayName;
            form.button(buttonText);
        });

        // Agregar botón para configurar todos
        form.button(`§lConfigurar Todos\n§r§8todos los sistemas de esta categoría`);

        // Agregar botón de volver
        form.button("§8« Volver al menú principal");

        system.run(() => {
            form.show(player).then(res => {
                if (!res || res.canceled) return;

                const selectedIndex = res.selection;
                if (selectedIndex === undefined || selectedIndex < 0) return;

                // Botón "Volver" es el último
                if (selectedIndex === systems.length + 1) {
                    // Volver al menú principal
                    import("./menu.js").then(module => {
                        module.buildAndShowMenu(player);
                    });
                    return;
                }

                // Botón "Configurar Todos" es el penúltimo (después de todos los sistemas)
                if (selectedIndex === systems.length) {
                    showSystemMenu(player, systems, false);
                    return;
                }

                // Sistema individual (índice directo porque ya no hay botón al principio)
                const selectedSystem = systems[selectedIndex];
                if (selectedSystem) {
                    showSystemMenu(player, [selectedSystem], false);
                }
            });
        });
    } catch (e) {
        debugWarn("commandMenu", `Error mostrando menú de categoría: ${e}`, "red");
    }
}
