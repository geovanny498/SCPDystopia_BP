// Configuración de GUI para entidades
// - `global` contiene categorías/entradas que estarán disponibles por defecto
// - `entities` lista las entidades que aceptan abrir el GUI (referenciando `global`)
// - `specific` permite añadir o sobrescribir configuraciones por entidad
export default {
    global: {
        categories: [
            {
                category: "Distancia al jugador (tamed)",
                entries: [
                    {
                        label: "Cerca",
                        event: "humanoid:set_tamed_normal",
                    },
                    {
                        label: "Lejos",
                        event: "humanoid:set_tamed_war",
                    },
                ],
            },
            {
                category: "Movimiento",
                entries: [
                    {
                        label: "Seguir jugador",
                        event: "mtf:to_move",
                    },
                    {
                        label: "Caminar libremente",
                        event: "mtf:to_move_free",
                    },
                    { label: "Detenerse", event: "mtf:to_stop" },
                ],
            },
            {
                category: "Invencibilidad",
                entries: [
                    {
                        label: "Activar invencibilidad",
                        event: "humanoid:start_invincible",
                    },
                    {
                        label: "Desactivar invencibilidad",
                        event: "humanoid:stop_invincible",
                    },
                ],
            },
            {
                category: "Barra de vida",
                entries: [
                    {
                        label: "Ocultar barra de vida",
                        event: "humanoid:dont_show_boss_bar",
                    },
                    {
                        label: "Mostrar barra de vida",
                        event: "humanoid:show_boss_bar",
                    },
                ],
            },
            {
                category: "Teletransporte",
                entries: [
                    {
                        label: "Iniciar teletransporte",
                        event: "humanoid:start_teleport",
                    },
                    {
                        label: "Iniciar teletransporte cercano",
                        event: "humanoid:start_teleport_near",
                    },
                    {
                        label: "Detener teletransporte",
                        event: "humanoid:stop_teleport",
                    },
                ],
            },
        ],
    },

    // Lista de entidades que abrirán el GUI.
    // Valor true indica que usarán `global` por defecto.
    entities: {
        foundation: {
            "lc:dt_chara": true,
            "lc:dt_thedeath": true,
            "lc:dt_alpha1c": true,
            "lc:dt_alpha1l": true,
            "lc:dt_alpha1": true,
            "lc:dt_epsilon11c": true,
            "lc:dt_epsilon11": true,
            "lc:dt_eta10c": true,
            "lc:dt_eta10": true,
            "lc:dt_nu7c": true,
            "lc:dt_nu7": true,
            "lc:dt_beta7c": true,
            "lc:dt_beta7": true,
            "lc:dt_epsilon6c": true,
            "lc:dt_epsilon6": true,
        },
        chaos: {
            "lc:dt_cd_commander": true,
            "lc:dt_cd_leader": true,
            "lc:dt_cd": true,
            "lc:dt_chaos_insurgency": true,
        },
    },

    // Qué ítem debe tener el jugador en mano para abrir el menú según la facción
    // key = grupo en `entities`
    openItem: {
        foundation: "lc:dt_commander",
        chaos: "breeze_rod",
    },

    // Configuraciones específicas por entidad. Cada entrada puede tener:
    // - `replace: true` para reemplazar las categorías globales
    // - `categories: [...]` para añadir o reemplazar
    specific: {
        // "lc:dt_chara": { replace: false, categories: [ /* ... */ ] },
        "lc:dt_chara": {
            replace: false,
            // `insertAt`: "start" | "end" — dónde insertar las categorías específicas respecto a las globales
            insertAt: "start",
            categories: [
                {
                    category: "Variante",
                    entries: [
                        {
                            label: "Sin máscara",
                            event: "start_chara",
                        },
                        {
                            label: "con máscara",
                            event: "start_chara1",
                        },
                        {
                            label: "Sin máscara (Sangre)",
                            event: "start_chara2",
                        },
                        {
                            label: "con máscara (Sangre)",
                            event: "start_chara3",
                        },
                    ],
                },
            ],
        },
        "lc:dt_thedeath": {
            replace: false,
            insertAt: "start",
            categories: [
                {
                    category: "Variante",
                    entries: [
                        {
                            label: "Normal",
                            event: "start_death",
                        },
                        {
                            label: "Normal (Sangre)",
                            event: "start_death1",
                        },
                        {
                            label: "Hazmat",
                            event: "start_death2",
                        },
                        {
                            label: "Hazmat (Sangre)",
                            event: "start_death3",
                        },
                    ],
                },
            ],
        },
    },
};
