// Ignorar cosas raras en las id como player_sneak o player_ads, player_uncertain, etc.
// solo guiarse por los comentarios para saber quien los dispara
export const projectileConfig = {
    // Soldados Normales (60 de vida)
    "lc:dt_m4a1_bullet": { damage: 4, knockback: 0.002, pierce: 0 },
    "lc:dt_m16_bullet": { damage: 3, knockback: 0.002, pierce: 0 },
    "lc:dt_ak47_bullet": { damage: 3, knockback: 0.002, pierce: 0 },
    "lc:dt_mp7_bullet": { damage: 3, knockback: 0.002, pierce: 0 },
    "lc:dt_p90_bullet": { damage: 5, knockback: 0.002, pierce: 0 },
    "lc:dt_scar_bullet": { damage: 4, knockback: 0.002, pierce: 0 },

    // Soldados Líderes (120 de vida)
    "lc:dt_m4a1_bullet_player": { damage: 5, knockback: 0.007, pierce: 1 },
    "lc:dt_mp7_bullet_player_normal": { damage: 4, knockback: 0.007, pierce: 1 },
    "lc:dt_m16_bullet_player": { damage: 4, knockback: 0.007, pierce: 1 },
    "lc:dt_p90_bullet_player_normal": { damage: 6, knockback: 0.007, pierce: 1 },
    "lc:dt_scar_bullet_player": { damage: 5, knockback: 0.007, pierce: 1 },

    // Soldados Comandantes (2000+ de vida) / Jugadores (20 de vida)
    "lc:dt_hk416_bullet_player_c": { damage: 6, knockback: 0.007, pierce: Infinity },
    "lc:dt_mp7_bullet_player_ads": { damage: 5, knockback: 0.007, pierce: Infinity },
    "lc:dt_ak47_bullet_player_ads": { damage: 5, knockback: 0.007, pierce: Infinity },
    "lc:dt_p90_bullet_player_ads": { damage: 7, knockback: 0.007, pierce: Infinity },
    "lc:dt_scar_bullet_player_sneak": { damage: 6, knockback: 0.007, pierce: Infinity },
    "lc:dt_m4a1_bullet_player_sneak": { damage: 6, knockback: 0.007, pierce: Infinity },
    "lc:dt_hk416_bullet_player_ads": { damage: 7, knockback: 0.007, pierce: Infinity },

    // Otros
    "lc:dt_suscharger_shot_player_sneak": { damage: 5, knockback: 0.007, pierce: 1 },
    "lc:dt_dtrifle_bullet_player_sneak": { damage: 60, knockback: 0.007, pierce: Infinity },
    "lc:dt_mp5a3_bullet_player_uncertain": { damage: 8, knockback: 0.007, pierce: 1 },
    "lc:dt_m4a1_bullet_player_uncertain": { damage: 6, knockback: 0.007, pierce: 1 }
};