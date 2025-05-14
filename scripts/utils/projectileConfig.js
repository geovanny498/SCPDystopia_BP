// utils/projectileConfig.js

// Ignorar cosas raras en las ids como player_sneak o player_ads, player_uncertain, etc.
// solo guiarse por los comentarios para saber quien los dispara
export const projectileConfig = {
    // Soldados Normales (50-65 de vida)
    "lc:dt_m4a1_bullet": { damage: 5, knockback: 0.01, pierce: 2 },
    "lc:dt_m16_bullet": { damage: 4, knockback: 0.01, pierce: 2 },
    "lc:dt_ak47_bullet": { damage: 4, knockback: 0.01, pierce: 2 },
    "lc:dt_mp7_bullet": { damage: 4, knockback: 0.01, pierce: 2 },
    "lc:dt_p90_bullet": { damage: 5, knockback: 0.01, pierce: 2 },
    "lc:dt_scar_bullet": { damage: 5, knockback: 0.01, pierce: 2 },

    // Soldados Líderes (90-110 de vida)
    "lc:dt_m4a1_bullet_player": { damage: 6, knockback: 0.01, pierce: 3 },
    "lc:dt_mp7_bullet_player_normal": { damage: 5, knockback: 0.01, pierce: 3 },
    "lc:dt_m16_bullet_player": { damage: 5, knockback: 0.01, pierce: 3 },
    "lc:dt_p90_bullet_player_normal": { damage: 6, knockback: 0.01, pierce: 3 },
    "lc:dt_scar_bullet_player": { damage: 6, knockback: 0.01, pierce: 3 },

    // Soldados Comandantes (3000+ de vida)
    "lc:dt_hk416_bullet_player_c": { damage: 7, knockback: 0.01, pierce: 4 },
    "lc:dt_mp7_bullet_player_ads": { damage: 6, knockback: 0.01, pierce: 4 },
    "lc:dt_ak47_bullet_player_ads": { damage: 6, knockback: 0.01, pierce: 4 },
    "lc:dt_p90_bullet_player_ads": { damage: 8, knockback: 0.01, pierce: 4 },
    "lc:dt_scar_bullet_player_sneak": { damage: 7, knockback: 0.01, pierce: 4 },
    "lc:dt_m4a1_bullet_player_sneak": { damage: 7, knockback: 0.01, pierce: 4 },
    "lc:dt_hk416_bullet_player_ads": { damage: 8, knockback: 0.01, pierce: 4 },

    // Jugador (20 de vida) Aplok Guns
    "lc:dt_mp7_player_bullet": { damage: 6, knockback: 0.01, pierce: 4 },
    "lc:dt_ak47_player_bullet": { damage: 6, knockback: 0.01, pierce: 4 },
    "lc:dt_p90_player_bullet": { damage: 8, knockback: 0.01, pierce: 4 },
    "lc:dt_dtrifle_player_bullet": { damage: 60, knockback: 0.01, pierce: 4 },
    "lc:dt_scar_player_bullet": { damage: 7, knockback: 0.01, pierce: 4 },
    "lc:dt_m4a1_player_bullet": { damage: 7, knockback: 0.01, pierce: 4 },
    "lc:dt_hk416_player_bullet": { damage: 8, knockback: 0.01, pierce: 4 },

    // Sin usar
    "lc:dt_suscharger_shot_player_sneak": { damage: 5, knockback: 0.01, pierce: 2 },
    "lc:dt_dtrifle_bullet_player_sneak": { damage: 60, knockback: 0.01, pierce: 4 },
    "lc:dt_mp5a4_bullet_player_uncertain": { damage: 8, knockback: 0.01, pierce: 2 },
    "lc:dt_m4a1_bullet_player_uncertain": { damage: 6, knockback: 0.01, pierce: 2 }
};