// Covers players already in a blocked dimension, including an old save.
// Only players checked, once per second. No chunk/world/entity scans.
var OWG_CFG = JsonIO.read('kubejs/config/overworld_survival.json') || {}
var owgTicks = 0
ServerEvents.tick(event => {
  if (OWG_CFG.enabled === false || ++owgTicks % 20 !== 0) return
  var blocked = OWG_CFG.blockedDimensions || ['minecraft:the_nether', 'minecraft:the_end']
  var players = event.server.players
  for (var i = 0; i < players.size(); i++) {
    var player = players.get(i)
    if (blocked.indexOf(String(player.level.dimension)) < 0) continue
    var overworld = event.server.overworld()
    var pos = overworld.getSharedSpawnPos()
    player.teleportTo(overworld, pos.getX() + 0.5, pos.getY(), pos.getZ() + 0.5, player.getYRot(), player.getXRot())
    player.tell(Text.translate('overworld_survival.dimension_locked'))
  }
})
