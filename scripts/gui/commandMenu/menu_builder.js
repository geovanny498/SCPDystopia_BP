// scripts/gui/commandMenu/menu_builder.js
import { ModalFormData } from "@minecraft/server-ui";
import { ControlType, Factions, menuConfig } from "./menu_config.js";

/**
 * Construye el formulario para uno o más sistemas
 * @param {Array<Object>} systems - Array de configuraciones de sistemas
 * @param {Object} loadedStates - Estados cargados de los sistemas
 * @returns {ModalFormData}
 */
export function buildSystemForm(systems, loadedStates) {
    // Determinar el título
    let title = menuConfig.title;
    if (systems.length === 1) {
        title = systems[0].displayName;
    }

    const form = new ModalFormData().title(title);

    const systemCount = systems.length;

    systems.forEach((system, index) => {
        // Título del sistema (solo si hay múltiples sistemas)
        if (systemCount > 1) {
            form.label(system.displayName);
        }

        // Construir controles para cada bando
        const factionOrder = [Factions.FOUNDATION, Factions.CHAOS];

        factionOrder.forEach(faction => {
            const factionConfig = system.factions[faction];
            if (!factionConfig) return;

            // Label del bando
            form.label(factionConfig.label);

            // Estado cargado o default
            const state = loadedStates[system.id]?.[faction] || system.defaults[faction];

            // Controles según el tipo
            if (system.controlType === ControlType.TOGGLE) {
                // Toggle para normales
                const normalValue = state.enable ?? false;
                form.toggle(factionConfig.normalLabel, { defaultValue: normalValue });

                // Toggle para especiales (si está soportado)
                if (system.supportsSpecials) {
                    const specialValue = state.includeSpecial ?? false;
                    form.toggle(factionConfig.specialLabel, { defaultValue: specialValue });
                }
            } else if (system.controlType === ControlType.DROPDOWN) {
                // Dropdown para normales
                const normalValue = state.mode ?? system.defaults[faction].mode;
                const normalIndex = system.options.findIndex(opt => opt.value === normalValue);
                const labels = system.options.map(opt => opt.label);

                form.dropdown(
                    factionConfig.normalLabel,
                    labels,
                    { defaultValueIndex: Math.max(0, normalIndex) }
                );

                // Dropdown para especiales (si está soportado)
                if (system.supportsSpecials) {
                    const specialValue = state.includeSpecial ?? system.defaults[faction].includeSpecial;
                    const specialIndex = system.options.findIndex(opt => opt.value === specialValue);

                    form.dropdown(
                        factionConfig.specialLabel,
                        labels,
                        { defaultValueIndex: Math.max(0, specialIndex) }
                    );
                }
            }
        });

        // Divisor entre sistemas (excepto después del último)
        if (menuConfig.useDividers && index < systemCount - 1) {
            form.divider();
        }
    });

    return form;
}

/**
 * Parsea los valores del formulario para uno o más sistemas
 * @param {Array<Object>} systems - Array de configuraciones de sistemas
 * @param {Array} formValues - Valores retornados por el formulario
 * @returns {Object} - Estados parseados por sistema
 */
export function parseSystemFormValues(systems, formValues) {
    // Filtrar valores nulos/undefined (labels y dividers)
    const filtered = formValues.filter(v => v !== null && v !== undefined);

    const parsedStates = {};
    let valueIndex = 0;

    const nextValue = () => {
        const v = filtered[valueIndex];
        valueIndex += 1;
        return v;
    };

    systems.forEach(system => {
        const systemState = {
            [Factions.FOUNDATION]: {},
            [Factions.CHAOS]: {}
        };

        const factionOrder = [Factions.FOUNDATION, Factions.CHAOS];

        factionOrder.forEach(faction => {
            if (system.controlType === ControlType.TOGGLE) {
                // Leer toggle de normales
                const normalValue = !!nextValue();
                systemState[faction].enable = normalValue;

                // Leer toggle de especiales (si está soportado)
                if (system.supportsSpecials) {
                    const specialValue = !!nextValue();
                    systemState[faction].includeSpecial = specialValue;
                }
            } else if (system.controlType === ControlType.DROPDOWN) {
                // Leer dropdown de normales
                const normalIndex = nextValue();
                const normalValue = typeof normalIndex === "number"
                    ? system.options[normalIndex]?.value
                    : (normalIndex || system.defaults[faction].mode);

                systemState[faction].mode = normalValue;

                // Leer dropdown de especiales (si está soportado)
                if (system.supportsSpecials) {
                    const specialIndex = nextValue();
                    const specialValue = typeof specialIndex === "number"
                        ? system.options[specialIndex]?.value
                        : (specialIndex || system.defaults[faction].includeSpecial);

                    systemState[faction].includeSpecial = specialValue;
                }
            }
        });

        parsedStates[system.id] = systemState;
    });

    return parsedStates;
}

/**
 * Genera el mensaje de confirmación según los sistemas configurados
 * @param {string} playerName - Nombre del jugador
 * @param {Array<Object>} systems - Array de sistemas configurados
 * @param {boolean} isAllCategory - Si se configuró la categoría "all"
 * @returns {string}
 */
export function getConfirmationMessage(playerName, systems, isAllCategory = false) {
    // Si es la categoría "all", usar mensaje general
    if (isAllCategory) {
        return menuConfig.messages.allSystems.replace("{player}", playerName);
    }

    // Si es un solo sistema o múltiples, listar sus nombres con colores
    const systemNames = systems
        .map(sys => `${sys.displayName}§r`) // Mantener colores y agregar §r después
        .join(", ");

    return menuConfig.messages.specificSystems
        .replace("{player}", playerName)
        .replace("{systems}", systemNames);
}
