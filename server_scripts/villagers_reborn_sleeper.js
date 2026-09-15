// Villagers Reborn CPU Sleeper
// KubeJS 2001.6.5 / Forge 1.20.1

// Scan once per 5 seconds. Hysteresis prevents rapid sleep/wake switching.
var VRS_CHECK_INTERVAL = 100
var VRS_SLEEP_DISTANCE = 96
var VRS_WAKE_DISTANCE = 80
var VRS_SLEEP_DISTANCE_SQ = VRS_SLEEP_DISTANCE * VRS_SLEEP_DISTANCE
var VRS_WAKE_DISTANCE_SQ = VRS_WAKE_DISTANCE * VRS_WAKE_DISTANCE
var VRS_TAG = 'vrs_cpu_sleeping'
var vrsTick = 0

function vrsIsTarget(entity) {
  try {
    return String(entity.getClass().getName()).indexOf('com.javic.slimpatch.entity.') === 0
  } catch (ignored) {}
  return false
}

function vrsDistanceSq(entity, player) {
  var dx = entity.x - player.x
  var dy = entity.y - player.y
  var dz = entity.z - player.z
  return dx * dx + dy * dy + dz * dz
}

function vrsNearestPlayerDistanceSq(entity, players) {
  var nearest = 999999999
  for (var i = 0; i < players.size(); i++) {
    var distance = vrsDistanceSq(entity, players.get(i))
    if (distance < nearest) nearest = distance
  }
  return nearest
}

function vrsHasTag(entity) {
  try { return entity.getTags().contains(VRS_TAG) } catch (ignored) {}
  return false
}

function vrsSleep(entity) {
  try {
    // Tag first so this script only wakes villagers it put to sleep itself.
    entity.addTag(VRS_TAG)
    entity.setNoAi(true)
  } catch (ignored) {}
}

function vrsWake(entity) {
  try {
    entity.setNoAi(false)
    entity.removeTag(VRS_TAG)
  } catch (ignored) {}
}

ServerEvents.tick(event => {
  vrsTick++
  if (vrsTick % VRS_CHECK_INTERVAL !== 0) return

  var level = event.server.overworld()
  var players = level.players
  if (players.size() === 0) return

  var iterator = level.getAllEntities().iterator()
  while (iterator.hasNext()) {
    var villager = iterator.next()
    if (!villager.isAlive() || !vrsIsTarget(villager)) continue

    var sleepingByScript = vrsHasTag(villager)
    var nearestDistance = vrsNearestPlayerDistanceSq(villager, players)

    if (!sleepingByScript && nearestDistance > VRS_SLEEP_DISTANCE_SQ) {
      vrsSleep(villager)
    } else if (sleepingByScript && nearestDistance < VRS_WAKE_DISTANCE_SQ) {
      vrsWake(villager)
    }
  }
})

