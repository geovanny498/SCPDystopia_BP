tellraw @s[tag=!dt_pd_ready] {"rawtext":[{"text":"§eYou have to read warning. Please run §l/function scpdystopia/enable_pd"}]}
tellraw @s[tag=dt_pd_ready] {"rawtext":[{"text":"§c[Warning] §ePocket Dimension has been generated. You have to run §l/function scpdystopia/scp106_pd_on§r§e near SCP-106."}]}

execute @s[tag=dt_pd_ready] ~~~ structure load mystructure:dt_pd ~ -45 ~

tag @s[tag=dt_pd_ready] remove dt_pd_ready