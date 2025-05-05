// utils/weapons.js
import { world, system } from "@minecraft/server";
import { debugMessage, debugWarn } from "../utils/debug.js";

// Mapeo de armas con propiedades (Sólo Aplok Guns)
const weaponData = {
  "gabrielaplok:m4a1": {
    projectile: "lc:dt_hk416_bullet_player_ads",
    speed: 15.0,
    fireRate: 2,
    isAutomatic: true,
    onEntryCommands: [
      "function guns/fire/m4a1",
      "execute as @s[score={m4a1=1}] run function effect/gun_dryfire"
    ]
  },
  "gabrielaplok:m249": {
    projectile: "lc:dt_scar_bullet_player_sneak",
    speed: 15.0,
    fireRate: 1,
    isAutomatic: true,
    onEntryCommands: [
      "function guns/fire/m249",
      "execute as @s[score={m249=1}] run function effect/gun_dryfire"
    ]
  },
  "gabrielaplok:mp5a5": {
    projectile: "lc:dt_mp7_bullet_player_ads",
    speed: 15.0,
    fireRate: 2,
    isAutomatic: true,
    onEntryCommands: [
      "function guns/fire/mp5a5",
      "execute as @s[score={mp5a5=1}] run function effect/gun_dryfire"
    ]
  },
  "gabrielaplok:ak47": {
    projectile: "lc:dt_ak47_bullet_player_ads",
    speed: 15.0,
    fireRate: 3,
    isAutomatic: true,
    onEntryCommands: [
      "function guns/fire/ak47",
      "execute as @s[score={ak47=1}] run function effect/gun_dryfire"
    ]
  },
  "gabrielaplok:awp": {
    projectile: "lc:dt_dtrifle_bullet_player_sneak",
    speed: 15.0,
    fireRate: 30,
    isAutomatic: false,
    onEntryCommands: [
      "function guns/fire/awp",
      "event entity @s[scores={awp=1..}] gabrielaplok:add_cycle",
      "execute as @s[score={awp=1}] run function effect/gun_dryfire"
    ]
  }
};

const firingPlayers = new Map(); // Para automáticas: player.id -> intervalId
const cooldownMap = new Map(); // Para semiautomáticas: player.id -> tick
export const projectileShooterMap = new Map(); // Proyectil -> jugador


function shoot(player, itemId) {
  const data = weaponData[itemId];
  if (!data) {
    debugWarn(`No se encontró la configuración del arma: ${itemId}`);
    return;
  }

  const direction = player.getViewDirection();
  const { x, y, z } = player.getHeadLocation();
  const spawnPos = {
    x: x + direction.x,
    y: y + direction.y,
    z: z + direction.z,
  };

  try {
    const projectile = player.dimension.spawnEntity(data.projectile, spawnPos);
    if (!projectile) {
      debugWarn(`No se pudo crear el proyectil: ${data.projectile}`);
      return;
    }

    projectileShooterMap.set(projectile.id, player);

    const velocity = {
      x: direction.x * data.speed,
      y: direction.y * data.speed,
      z: direction.z * data.speed,
    };

    projectile.applyImpulse(velocity);
    debugWarn(`Disparando ${itemId} → ${data.projectile}`);

    // Ejecutar los comandos definidos en onEntryCommands
    if (data.onEntryCommands) {
      for (const cmd of data.onEntryCommands) {
        player.runCommand(cmd).catch(e =>
          debugWarn(`[onEntry] Error ejecutando "${cmd}": ${e}`)
        );
      }
    }
  } catch (e) {
    debugWarn(`[Disparo] Error al crear proyectil: ${e}`);
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
      debugWarn(`Jugador ${player.id} está en cooldown.`);
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
    debugWarn(`Jugador ${playerId} dejó de disparar.`);
  }
}