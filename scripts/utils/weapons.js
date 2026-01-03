// scripts\utils\weapons.js
import { world, system } from "@minecraft/server";
import { debugMessage, debugWarn } from "../utils/debug.js";
import * as mc from "@minecraft/server";

// Mapeo de armas con propiedades (Sólo Aplok Guns)
const weaponData = {
    "gabrielaplok:m4a1": {
        projectile: "lc:dt_hk416_player_bullet",
        speed: 25.0,
        fireRate: 2,
        isAutomatic: true,
        onEntryCommands: [
            "function aplokguns/fire_m4a1",
        ]
    },
    "gabrielaplok:m249": {
        projectile: "lc:dt_scar_player_bullet",
        speed: 25.0,
        fireRate: 1,
        isAutomatic: true,
        onEntryCommands: [
            "function aplokguns/fire_m249"
        ]
    },
    "gabrielaplok:mp5a5": {
        projectile: "lc:dt_p90_player_bullet",
        speed: 25.0,
        fireRate: 2,
        isAutomatic: true,
        onEntryCommands: [
            "function aplokguns/fire_mp5a5"
        ]
    },
    "gabrielaplok:ak47": {
        projectile: "lc:dt_ak47_player_bullet",
        speed: 25.0,
        fireRate: 3,
        isAutomatic: true,
        onEntryCommands: [
            "function aplokguns/fire_ak47"
        ]
    },
    "gabrielaplok:awp": {
        projectile: "lc:dt_dtrifle_player_bullet",
        speed: 25.0,
        fireRate: 30,
        isAutomatic: false,
        onEntryCommands: [
            "function aplokguns/fire_awp"
        ]
    }
};

const firingPlayers = new Map(); // Para automáticas: player.id -> intervalId
const cooldownMap = new Map(); // Para semiautomáticas: player.id -> tick

// Como respaldo de proyectil -> jugador
// export const projectileShooterMap = new Map();


function shoot(player, itemId) {
    const data = weaponData[itemId];
    if (!data) {
        debugWarn("player", `No se encontró la configuración del arma: ${itemId}`, "yellow");
        return;
    }

    const direction = player.getViewDirection();
    const { x, y, z } = player.getHeadLocation();
    const spawnPos = {
        x: x + direction.x,
        y: y + direction.y,
        z: z + direction.z,
    };

    if (spawnPos.y > 321) {
        debugWarn("player", `[Disparo] Posición demasiado alta para generar proyectil: Y=${spawnPos.y}`, "red");
        return;
    }

    try {
        const projectile = player.dimension.spawnEntity(data.projectile, spawnPos);
        if (!projectile) {
            debugWarn("player", `No se pudo crear el proyectil: ${data.projectile}`, "red");
            return;
        }

        // Mantener el map por compatibilidad
        // projectileShooterMap.set(projectile.id, player);

        // Asignar propietario nativo
        const projComp = projectile.getComponent("minecraft:projectile");
        if (projComp) {
            projComp.owner = player;
        }

        const velocity = {
            x: direction.x * data.speed,
            y: direction.y * data.speed,
            z: direction.z * data.speed,
        };

        // if (projComp && projComp.shoot) {
        projComp.shoot(velocity);
        // } else {
        //     projectile.applyImpulse(velocity);
        // }

        // Depuración del player
        debugWarn(
            "player",
            `[DEBUG] Player id=${player.id}, typeId=${player.typeId}, location=(${player.location.x.toFixed(2)}, ${player.location.y.toFixed(2)}, ${player.location.z.toFixed(2)}), properties=${Object.getOwnPropertyNames(player).join(", ")}`,
            "blue"
        );

        // Depuración de armadura usando el componente equippable
        if (player.typeId === "minecraft:player") {
            const equippable = player.getComponent("equippable");
            if (equippable) {
                const helmet = equippable.getEquipment(mc.EquipmentSlot.Head);
                const chest = equippable.getEquipment(mc.EquipmentSlot.Chest);
                const legs = equippable.getEquipment(mc.EquipmentSlot.Legs);
                const boots = equippable.getEquipment(mc.EquipmentSlot.Feet);

                debugWarn(
                    "player",
                    `[DEBUG] Player armadura: Head=${helmet?.typeId || "Ninguno"}, Chest=${chest?.typeId || "Ninguno"}, Legs=${legs?.typeId || "Ninguno"}, Feet=${boots?.typeId || "Ninguno"}`,
                    "cyan"
                );
            } else {
                debugWarn("player", `[DEBUG] Player armadura: Ninguna (equippable no disponible)`, "cyan");
            }
        }


        debugWarn("player", `Disparando ${itemId} → ${data.projectile}`, "green");

        if (data.onEntryCommands) {
            for (const cmd of data.onEntryCommands) {
                try {
                    const result = player.runCommand(cmd);
                    debugWarn("player", `Ejecutando "${cmd}" → éxito=${result.successCount}`, "cyan");
                } catch (err) {
                    debugWarn("player", `Error ejecutando comando "${cmd}": ${err}`, "red");
                }
            }
        }
    } catch (e) {
        debugWarn("player", `[Disparo] Error al crear proyectil: ${e}`, "red");
    }
}

// itemUse → al presionar clic
world.afterEvents.itemUse.subscribe(event => {
    const player = event.source;
    if (!player) return;

    const slot = player.selectedSlotIndex;
    const item = player.getComponent("minecraft:inventory")?.container?.getItem(slot);
    if (!item) return;

    const data = weaponData[item.typeId];
    if (!data) return;

    if (data.isAutomatic) {
        if (firingPlayers.has(player.id)) return;

        const intervalId = system.runInterval(() => {
            const inventory = player.getComponent("minecraft:inventory")?.container;
            const currentItem = inventory?.getItem(player.selectedSlotIndex);
            if (!currentItem || currentItem.typeId !== item.typeId) {
                stopShooting(player.id);
                return;
            }
            shoot(player, item.typeId);
        }, data.fireRate);

        firingPlayers.set(player.id, intervalId);
    } else {
        const currentTick = system.currentTick;
        const nextAllowedTick = cooldownMap.get(player.id) ?? 0;

        if (currentTick < nextAllowedTick) {
            debugWarn(`Jugador ${player.id} está en cooldown.`, "cyan");
            return;
        }

        shoot(player, item.typeId);
        cooldownMap.set(player.id, currentTick + data.fireRate);
    }
});


// itemReleaseUse → al soltar el clic
world.afterEvents.itemReleaseUse.subscribe(event => {
    const player = event.source;
    if (!player) return;
    stopShooting(player.id);
});


function stopShooting(playerId) {
    const intervalId = firingPlayers.get(playerId);
    if (intervalId !== undefined) {
        system.clearRun(intervalId);
        firingPlayers.delete(playerId);
        debugWarn(`Jugador ${playerId} dejó de disparar.`, "cyan");
    }
}

world.beforeEvents.playerLeave.subscribe(event => {
    const playerId = event.player.id;

    // Borrar cooldownMap
    cooldownMap.delete(playerId);
    debugWarn(`Borrando a Jugador ${playerId} del cooldownMap`, "cyan");

    // Borrar firingPlayers y limpiar interval si existía
    stopShooting(playerId);
});
