// scripts/gui/commandMenu/menu_config.js

/**
 * Configuración centralizada del menú de comandos
 * Este archivo define todas las categorías, sistemas y sus comportamientos
 */

// Definición de tipos de control
export const ControlType = {
    TOGGLE: "toggle",
    DROPDOWN: "dropdown"
};

// Definición de bandos
export const Factions = {
    FOUNDATION: "foundation",
    CHAOS: "chaos"
};

// Definición de unidades especiales por bando
export const specialUnits = {
    [Factions.FOUNDATION]: [
        "§c§lMTF Delta-1 Chara", "§d§lMTF Delta-1 Frisk", "§d§lMTF Delta-1 Commander",
        "§d§lMTF Delta-1 Mita", "§d§lMTF Delta-1 Leader", "§lMTF Alpha-1 Commander",
        "§lMTF Alpha-1 Commander 2", "§lMTF Alpha-1 Commander 3", "§1§lMTF Epsilon-11 Commander",
        "§b§lMTF Eta-10 Commander", "§8§lMTF Nu-7 Commander", "§6§lMTF Beta-7 Commander",
        "§e§lMTF Epsilon-6 Commander",
    ],
    [Factions.CHAOS]: [
        "§2§lChaos Delta Commander", "§a§lChaos Delta Leader 1", "§a§lChaos Delta Leader 2",
        "§a§lChaos Delta Leader 3", "§a§lChaos Delta Leader 4",
    ]
};

/**
 * Definición de sistemas
 * Cada sistema define su comportamiento completo incluyendo eventos
 * Puedes usar códigos § directamente en displayName
 */
export const systems = {
    movement: {
        id: "movement",
        displayName: "§1Movimiento / Patrulla",
        description: "§8(Sólo entidades existentes)",
        category: "movement_patrol",
        dynamicProperty: "scpd_system_movement",
        controlType: ControlType.DROPDOWN,
        supportsSpecials: true,

        // Opciones para dropdown con eventos asociados
        options: [
            {
                value: "follow_close",
                label: "Seguir jugador (Cerca)",
                events: {
                    start: "humanoid:set_tamed_close"
                }
            },
            {
                value: "follow_far",
                label: "Seguir jugador (Lejos)",
                events: {
                    start: "humanoid:set_tamed_far"
                }
            },
            {
                value: "free",
                label: "Caminar libremente",
                events: {
                    start: "mtf:to_move_free"
                }
            },
            {
                value: "stop",
                label: "Detenerse",
                events: {
                    start: "mtf:to_stop"
                }
            }
        ],

        factions: {
            [Factions.FOUNDATION]: {
                label: "§lFoundation",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            },
            [Factions.CHAOS]: {
                label: "§2§lChaos",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            }
        },

        defaults: {
            [Factions.FOUNDATION]: { mode: "free", includeSpecial: "free" },
            [Factions.CHAOS]: { mode: "free", includeSpecial: "free" }
        }
    },

    fire: {
        id: "fire",
        displayName: "§cModo de Disparo",
        description: "",
        category: "combat",
        dynamicProperty: "scpd_system_fire",
        controlType: ControlType.DROPDOWN,
        supportsSpecials: true,

        // Opciones para dropdown con eventos asociados
        // IMPORTANTE: Siempre debe tener uno de los 3 modos activos
        options: [
            {
                value: "enemies_only",
                label: "Solo Hostiles",
                events: {
                    start: "humanoid:fire_enemies_only"
                }
            },
            {
                value: "defensive",
                label: "Defensivo (alcance reducido)",
                events: {
                    start: "humanoid:fire_defensive"
                }
            },
            {
                value: "on_hit",
                label: "Al Recibir Daño",
                events: {
                    start: "humanoid:fire_mode_hit"
                }
            }
        ],

        factions: {
            [Factions.FOUNDATION]: {
                label: "§lFoundation",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            },
            [Factions.CHAOS]: {
                label: "§2§lChaos",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            }
        },

        defaults: {
            [Factions.FOUNDATION]: { mode: "enemies_only", includeSpecial: "enemies_only" },
            [Factions.CHAOS]: { mode: "enemies_only", includeSpecial: "enemies_only" }
        }
    },

    spawn: {
        id: "spawn",
        displayName: "§1Spawn de soldados",
        description: "",
        category: "advanced",
        dynamicProperty: "scpd_system_spawn",
        controlType: ControlType.TOGGLE,
        supportsSpecials: true,

        // Eventos asociados a cada opción
        events: {
            enable: {
                true: "humanoid:start_spawn_soldiers",
                false: "humanoid:stop_spawn_soldiers"
            }
        },

        factions: {
            [Factions.FOUNDATION]: {
                label: "§lFoundation",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            },
            [Factions.CHAOS]: {
                label: "§2§lChaos",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            }
        },

        defaults: {
            [Factions.FOUNDATION]: { enable: false, includeSpecial: false },
            [Factions.CHAOS]: { enable: false, includeSpecial: false }
        }
    },

    health: {
        id: "health",
        displayName: "§cBarra de vida",
        description: "",
        category: "advanced",
        dynamicProperty: "scpd_system_health",
        controlType: ControlType.TOGGLE,
        supportsSpecials: true,

        // Eventos asociados a cada opción
        events: {
            enable: {
                true: "humanoid:show_boss_bar",
                false: "humanoid:dont_show_boss_bar"
            }
        },

        factions: {
            [Factions.FOUNDATION]: {
                label: "§lFoundation",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            },
            [Factions.CHAOS]: {
                label: "§2§lChaos",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            }
        },

        defaults: {
            [Factions.FOUNDATION]: { enable: false, includeSpecial: false },
            [Factions.CHAOS]: { enable: false, includeSpecial: false }
        }
    },

    teleport: {
        id: "teleport",
        displayName: "§2Teletransportación",
        description: "",
        category: "advanced",
        dynamicProperty: "scpd_system_teleport",
        controlType: ControlType.DROPDOWN,
        supportsSpecials: true,

        // Opciones para dropdown con eventos asociados
        options: [
            {
                value: "normal",
                label: "Normal",
                events: {
                    start: "humanoid:start_teleport",
                    // stop: "humanoid:stop_teleport"
                }
            },
            {
                value: "near",
                label: "Cercano",
                events: {
                    start: "humanoid:start_teleport_near",
                    // stop: "humanoid:stop_teleport_near"
                }
            },
            {
                value: "false",
                label: "Desactivado",
                events: {
                    stop: "humanoid:stop_teleport"
                }
            }
        ],

        factions: {
            [Factions.FOUNDATION]: {
                label: "§lFoundation",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            },
            [Factions.CHAOS]: {
                label: "§2§lChaos",
                normalLabel: "Normales",
                specialLabel: "Especiales"
            }
        },

        defaults: {
            [Factions.FOUNDATION]: { mode: "false", includeSpecial: "false" },
            [Factions.CHAOS]: { mode: "false", includeSpecial: "false" }
        }
    },
};

/**
 * Definición de categorías para el menú principal
 * Cada categoría agrupa sistemas relacionados
 * Puedes usar códigos § directamente en displayName
 * Si description está vacío, no ocupará espacio en el botón
 */
export const categories = {
    movement_patrol: {
        id: "movement_patrol",
        displayName: "§1Movimiento / Patrulla",
        description: "§8(Sólo entidades existentes)",
        systems: ["movement"]
    },
    combat: {
        id: "combat",
        displayName: "§cAtaque / Reglas de disparo",
        description: "",
        systems: ["fire"]
    },
    advanced: {
        id: "advanced",
        displayName: "§6Configuración avanzada",
        description: "",
        systems: ["spawn", "health", "teleport"]
    },
    all: {
        id: "all",
        displayName: "§lTodos los Sistemas",
        description: "",
        systems: ["movement", "fire", "spawn", "health", "teleport"]
    }
};

/**
 * Configuración del menú principal
 */
export const menuConfig = {
    title: "SCPDystopia | Panel de Comandos",

    // Orden de las categorías en el menú principal (similar a gui.js)
    categoryOrder: ["movement_patrol", "combat", "advanced", "all"],

    // Usar divisores entre sistemas en formularios
    useDividers: true,

    // Mensajes de confirmación
    messages: {
        // Mensaje cuando se configura la categoría "all"
        allSystems: "§8[MENU] §7{player} §rconfiguró §6todos los sistemas§r. Usa §bscpd:check_world_props§r para ver las opciones aplicadas§r.",

        // Mensaje cuando se configuran sistemas específicos
        // {player} = nombre del jugador
        // {systems} = lista de sistemas configurados
        specificSystems: "§8[MENU] §7{player} §rconfiguró: §6{systems}§r."
    }
};

/**
 * Obtiene la configuración de un sistema por su ID
 * @param {string} systemId 
 * @returns {Object|null}
 */
export function getSystemConfig(systemId) {
    return systems[systemId] || null;
}

/**
 * Obtiene la configuración de una categoría por su ID
 * @param {string} categoryId 
 * @returns {Object|null}
 */
export function getCategoryConfig(categoryId) {
    return categories[categoryId] || null;
}

/**
 * Obtiene todos los sistemas de una categoría
 * @param {string} categoryId 
 * @returns {Array<Object>}
 */
export function getSystemsByCategory(categoryId) {
    const category = categories[categoryId];
    if (!category) return [];
    return category.systems.map(id => systems[id]).filter(Boolean);
}

/**
 * Obtiene todas las categorías en el orden configurado
 * @returns {Array<Object>}
 */
export function getOrderedCategories() {
    return menuConfig.categoryOrder.map(id => categories[id]).filter(Boolean);
}

/**
 * Obtiene los valores por defecto de un sistema
 * @param {string} systemId 
 * @returns {Object}
 */
export function getSystemDefaults(systemId) {
    const sys = systems[systemId];
    if (!sys) return {};
    return sys.defaults;
}

/**
 * Obtiene los eventos de un sistema según el tipo de control
 * @param {string} systemId 
 * @param {string} value - El valor seleccionado (true/false para toggle, o el value de la opción para dropdown)
 * @returns {Object} - Objeto con eventos { start?, stop? }
 */
export function getSystemEvents(systemId, value) {
    const sys = systems[systemId];
    if (!sys) return {};

    if (sys.controlType === ControlType.TOGGLE) {
        // Para toggle, value es true/false
        return sys.events?.enable?.[value] ? { event: sys.events.enable[value] } : {};
    } else if (sys.controlType === ControlType.DROPDOWN) {
        // Para dropdown, buscar la opción por value
        const option = sys.options?.find(opt => opt.value === value);
        return option?.events || {};
    }

    return {};
}
