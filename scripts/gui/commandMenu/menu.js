// scripts\gui\commandMenu\menu.js
import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { debugWarn } from "../../utils/debug.js";

// Importar módulos de configuración y lógica
import { getOrderedCategories } from "./menu_config.js";
import { showCategoryMenu } from "./menu_category.js";

/**
 * Construye y muestra el menú principal de categorías
 * @param {Player} player - El jugador que abrirá el menú
 */
function buildAndShowMenu(player) {
    try {
        debugWarn("commandMenu", "=== Iniciando buildAndShowMenu ===", "cyan");
        debugWarn("commandMenu", `Player: ${player?.name || "undefined"}`, "cyan");

        const categories = getOrderedCategories();
        debugWarn("commandMenu", `Categorías cargadas: ${categories.length}`, "cyan");

        const form = new ActionFormData()
            .title("SCPDystopia | Panel de Comandos")
            .body("§7Selecciona una categoría para configurar:");

        // Agregar botones para cada categoría
        categories.forEach(category => {
            // Si la descripción está vacía, no agregar salto de línea
            const buttonText = category.description
                ? `${category.displayName}\n§r§7${category.description}`
                : category.displayName;
            form.button(buttonText);
            debugWarn("commandMenu", `Botón agregado: ${category.displayName}`, "gray");
        });

        debugWarn("commandMenu", "Mostrando formulario...", "cyan");

        // Mostrar el formulario
        system.run(() => {
            form.show(player).then(res => {
                debugWarn("commandMenu", `Resultado del formulario: ${JSON.stringify(res)}`, "cyan");

                if (!res || res.canceled) {
                    debugWarn("commandMenu", "Formulario cancelado", "yellow");
                    return;
                }

                const selectedIndex = res.selection;
                if (selectedIndex === undefined || selectedIndex < 0) {
                    debugWarn("commandMenu", "Índice inválido", "red");
                    return;
                }

                const selectedCategory = categories[selectedIndex];
                if (!selectedCategory) {
                    debugWarn("commandMenu", `Categoría no encontrada en índice ${selectedIndex}`, "red");
                    return;
                }

                debugWarn("commandMenu", `Categoría seleccionada: ${selectedCategory.id}`, "cyan");

                // Mostrar el menú de la categoría seleccionada
                showCategoryMenu(player, selectedCategory.id);
            }).catch(err => {
                debugWarn("commandMenu", `Error en form.show: ${err}`, "red");
            });
        });
    } catch (e) {
        debugWarn("commandMenu", `Error mostrando menu principal: ${e}`, "red");
        debugWarn("commandMenu", `Stack: ${e.stack}`, "red");
    }
}

// Exportar la función principal
export { buildAndShowMenu };
