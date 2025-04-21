summon lc:dt_chara "§c§lMTF Delta-1 Chara"

summon lc:dt_alpha1c "§d§lMTF Delta-1 Frisk"
summon lc:dt_alpha1c "§d§lMTF Delta-1 Commander"
summon lc:dt_alpha1c "§d§lMTF Delta-1 Mita"
summon lc:dt_alpha1c "§d§lMTF Delta-1 Leader"


summon lc:dt_alpha1l "§lMTF Alpha-1 Commander"
summon lc:dt_alpha1l "§lMTF Alpha-1 Commander 2"
summon lc:dt_alpha1l "§lMTF Alpha-1 Commander 3"


summon lc:dt_epsilon11c "§1§lMTF Epsilon-11 Commander"
summon lc:dt_eta10c "§b§lMTF Eta-10 Commander"
summon lc:dt_nu7c "§8§lMTF Nu-7 Commander"
summon lc:dt_beta7c "§6§lMTF Beta-7 Commander"
summon lc:dt_epsilon6c "§e§lMTF Epsilon-6 Commander" 


event entity @e[name="§c§lMTF Delta-1 Chara"] start_chara1

event entity @e[name="§d§lMTF Delta-1 Frisk"] start_variant2
event entity @e[name="§d§lMTF Delta-1 Commander"] start_variant1
event entity @e[name="§d§lMTF Delta-1 Mita"] start_variant3
event entity @e[name="§d§lMTF Delta-1 Leader"] start_variant0

event entity @e[name="§lMTF Alpha-1 Commander"] start_variant0
event entity @e[name="§lMTF Alpha-1 Commander 2"] start_variant1
event entity @e[name="§lMTF Alpha-1 Commander 3"] start_variant2



effect @e[name="§c§lMTF Delta-1 Chara"] regeneration infinite 255 true
effect @e[name="§c§lMTF Delta-1 Chara"] resistance infinite 255 true

effect @e[name="§d§lMTF Delta-1 Frisk"] regeneration infinite 255 true
effect @e[name="§d§lMTF Delta-1 Frisk"] resistance infinite 255 true

effect @e[name="§d§lMTF Delta-1 Commander"] regeneration infinite 255 true
effect @e[name="§d§lMTF Delta-1 Commander"] resistance infinite 255 true

effect @e[name="§d§lMTF Delta-1 Mita"] regeneration infinite 255 true
effect @e[name="§d§lMTF Delta-1 Mita"] resistance infinite 255 true

effect @e[name="§d§lMTF Delta-1 Leader"] regeneration infinite 255 true
effect @e[name="§d§lMTF Delta-1 Leader"] resistance infinite 255 true


effect @e[name="§lMTF Alpha-1 Commander"] regeneration infinite 255 true
effect @e[name="§lMTF Alpha-1 Commander"] resistance infinite 255 true

effect @e[name="§lMTF Alpha-1 Commander 2"] regeneration infinite 255 true
effect @e[name="§lMTF Alpha-1 Commander 2"] resistance infinite 255 true

effect @e[name="§lMTF Alpha-1 Commander 3"] regeneration infinite 255 true
effect @e[name="§lMTF Alpha-1 Commander 3"] resistance infinite 255 true


effect @e[name="§1§lMTF Epsilon-11 Commander"] regeneration infinite 255 true
effect @e[name="§1§lMTF Epsilon-11 Commander"] resistance infinite 255 true

effect @e[name="§b§lMTF Eta-10 Commander"] regeneration infinite 255 true
effect @e[name="§b§lMTF Eta-10 Commander"] resistance infinite 255 true

effect @e[name="§8§lMTF Nu-7 Commander"] regeneration infinite 255 true
effect @e[name="§8§lMTF Nu-7 Commander"] resistance infinite 255 true

effect @e[name="§6§lMTF Beta-7 Commander"] regeneration infinite 255 true
effect @e[name="§6§lMTF Beta-7 Commander"] resistance infinite 255 true

effect @e[name="§e§lMTF Epsilon-6 Commander"] regeneration infinite 255 true
effect @e[name="§e§lMTF Epsilon-6 Commander"] resistance infinite 255 true