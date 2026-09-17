// Forge listeners must be in startup_scripts, not server_scripts. Restart required.
var OWL_CONFIG = JsonIO.read('kubejs/config/overworld_survival.json') || {}
ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityTravelToDimensionEvent', event => {
  if (OWL_CONFIG.enabled === false) return
  var blocked = OWL_CONFIG.blockedDimensions || ['minecraft:the_nether', 'minecraft:the_end']
  var target = String(event.getDimension().location())
  if (blocked.indexOf(target) >= 0) event.setCanceled(true)
})
