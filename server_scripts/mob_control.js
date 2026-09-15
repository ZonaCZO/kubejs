// Mob Control — KubeJS 2001.6.5 / Forge 1.20.1
// Replaces InControl spawn filtering. Front Director is the only Warium spawner.

const MC_CONFIG = 'kubejs/config/front_director_v3.json'
let mcSafeZones = null
let mcRobotIds = null

const MC_BLOCKED_VANILLA = {
  'minecraft:zombie': true,
  'minecraft:zombie_villager': true,
  'minecraft:drowned': true,
  'minecraft:skeleton': true,
  'minecraft:stray': true,
  'minecraft:creeper': true,
  'minecraft:spider': true,
  'minecraft:enderman': true,
  'minecraft:witch': true,
  'minecraft:pillager': true,
  'minecraft:phantom': true,
  'minecraft:slime': true
}

const MC_RARE_SUPPORT = {
  'crusty_chunks:hunter': true,
  'crusty_chunks:reaper': true
}

function mcEntityId(entity) {
  try { return String(entity.type.arch$registryName()) } catch (ignored) {}
  try { return String(entity.type) } catch (ignored) {}
  return ''
}

function mcHasTag(entity, tag) {
  try { return entity.tags.contains(tag) } catch (ignored) {}
  return false
}

function mcInRect(x, z, rect) {
  return x >= Math.min(Number(rect.x1), Number(rect.x2)) &&
    x <= Math.max(Number(rect.x1), Number(rect.x2)) &&
    z >= Math.min(Number(rect.z1), Number(rect.z2)) &&
    z <= Math.max(Number(rect.z1), Number(rect.z2))
}

function mcLoadConfig() {
  if (mcSafeZones == null || mcRobotIds == null) {
    const config = JsonIO.read(MC_CONFIG)
    mcSafeZones = config && config.safeZones ? config.safeZones : []
    mcRobotIds = {}
    const configuredRobots = config && config.robotEntities ? config.robotEntities : []
    const rareSupport = config && config.rareSupportEntities ? config.rareSupportEntities : []
    for (let i = 0; i < configuredRobots.length; i++) {
      mcRobotIds[String(configuredRobots[i])] = true
    }
    for (let i = 0; i < rareSupport.length; i++) {
      mcRobotIds[String(rareSupport[i])] = true
    }
  }
}

function mcInSafeZone(entity) {
  mcLoadConfig()
  for (let i = 0; i < mcSafeZones.length; i++) {
    if (mcInRect(entity.x, entity.z, mcSafeZones[i])) return true
  }
  return false
}

EntityEvents.spawned(event => {
  const entity = event.entity
  const id = mcEntityId(entity)
  if (!id) return

  // Old InControl vanilla-hostile blacklist.
  if (MC_BLOCKED_VANILLA[id]) {
    event.cancel()
    return
  }

  // Old InControl Cyberware mob blacklist.
  if (id.indexOf('cyber_ware_port:') === 0) {
    event.cancel()
    return
  }

  // Never filter Warium bullets, rockets, particles, ragdolls or other effects.
  // Only IDs listed as robots in the Front Director config are controlled.
  mcLoadConfig()
  if (MC_RARE_SUPPORT[id] && !mcHasTag(entity, 'fd_robot') && !mcHasTag(entity, 'fd_allow_manual')) {
  event.cancel()
  return
}

  if (!mcRobotIds[id]) return

  // No robot may appear inside a configured safe zone, including commands/eggs.
  if (mcInSafeZone(entity)) {
    event.cancel()
    return
  }


  // Only robots summoned and tagged by Front Director are accepted.
  // Add tag fd_allow_manual to NBT when a map maker intentionally places one.
  if (!mcHasTag(entity, 'fd_robot') && !mcHasTag(entity, 'fd_allow_manual')) {
    event.cancel()
  }
})
