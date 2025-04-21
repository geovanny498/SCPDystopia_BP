tag @e remove spawn_soldiers

tag @e[family=foundation] add spawn_soldiers
tag @e[family=chaos_insurgency] add spawn_soldiers

tag @e[name="§c§lMTF Delta-1 Chara"] remove spawn_soldiers

tag @e[name="§d§lMTF Delta-1 Frisk"] remove spawn_soldiers
tag @e[name="§d§lMTF Delta-1 Commander"] remove spawn_soldiers
tag @e[name="§d§lMTF Delta-1 Mita"] remove spawn_soldiers
tag @e[name="§d§lMTF Delta-1 Leader"] remove spawn_soldiers


tag @e[name="§lMTF Alpha-1 Commander"] remove spawn_soldiers
tag @e[name="§lMTF Alpha-1 Commander 2"] remove spawn_soldiers
tag @e[name="§lMTF Alpha-1 Commander 3"] remove spawn_soldiers


tag @e[name="§1§lMTF Epsilon-11 Commander"] remove spawn_soldiers
tag @e[name="§b§lMTF Eta-10 Commander"] remove spawn_soldiers
tag @e[name="§8§lMTF Nu-7 Commander"] remove spawn_soldiers
tag @e[name="§6§lMTF Beta-7 Commander"] remove spawn_soldiers
tag @e[name="§e§lMTF Epsilon-6 Commander"] remove spawn_soldiers

tag @e[name="§2§lChaos Delta Commander"] remove spawn_soldiers
tag @e[name="§a§lChaos Delta Leader 1"] remove spawn_soldiers
tag @e[name="§a§lChaos Delta Leader 2"] remove spawn_soldiers
tag @e[name="§a§lChaos Delta Leader 3"] remove spawn_soldiers
tag @e[name="§a§lChaos Delta Leader 4"] remove spawn_soldiers


event entity @e[tag=spawn_soldiers] humanoid:stop_spawn_soldiers