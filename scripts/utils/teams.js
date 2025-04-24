// Define aquí los bandos con los typeId completos
export const teamGroups = {
    chaos: new Set([
        "lc:dt_cd_commander",
        "lc:dt_cd_leader",
        "lc:dt_cd",
        "lc:dt_chaos_insurgency"
    ]),
    foundation: new Set([
        "lc:dt_chara",
        "lc:dt_alpha1c",
        "lc:dt_alpha1l",
        "lc:dt_alpha1",
        "lc:dt_epsilon11c",
        "lc:dt_epsilon11",
        "lc:dt_eta10c",
        "lc:dt_eta10",
        "lc:dt_nu7c",
        "lc:dt_nu7",
        "lc:dt_beta7c",
        "lc:dt_beta7",
        "lc:dt_epsilon6c",
        "lc:dt_epsilon"
    ])
};

export function getTeam(typeId) {
    for (const team in teamGroups) {
        if (teamGroups[team].has(typeId)) return team;
    }
    return null;
}
