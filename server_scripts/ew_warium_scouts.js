// Electronic Warfare 1.1.1 + Warium 1.3.2, Forge 1.20.1.
// Native EW coverage includes power, mode, array upgrades and portable jammers.
var ewScoutAPI=null
var ewScoutTick=0, ewScoutQueue=[], ewScoutCursor=0, ewScoutFailed=false
var EW_SCOUT_INTERVAL=20
var EW_SCOUT_BATCH=64
try {
  ewScoutAPI={
    reb:Java.loadClass('com.example.sbw_ew_addon.RadioRebJam'),
    test:Java.loadClass('net.minecraft.world.level.entity.EntityTypeTest'),
    scout:Java.loadClass('net.mcreator.crustychunks.entity.ScoutEntity'),
    raid:Java.loadClass('net.mcreator.crustychunks.entity.RaidscoutEntity')
  }
} catch(ewScoutMissing) {
  console.warn('[EW Scouts] Disabled: required mod classes unavailable. '+ewScoutMissing)
}
function ewScoutRefresh(server) {
  var queue=[]
  var levels=server.getAllLevels().iterator()
  while(levels.hasNext()) {
    var level=levels.next()
    var types=[ewScoutAPI.scout,ewScoutAPI.raid]
    for(var t=0;t<types.length;t++) {
      // Typed query of already loaded entities; never requests world chunks.
      var entities=level.getEntities(ewScoutAPI.test.forClass(types[t]), e=>e.isAlive())
      for(var i=0;i<entities.size();i++)queue.push({level:level,entity:entities.get(i)})
    }
  }
  ewScoutQueue=queue
  if(ewScoutCursor>=queue.length)ewScoutCursor=0
}
ServerEvents.tick(event=>{
  if(!ewScoutAPI || ewScoutFailed)return
  ewScoutTick++
  if(ewScoutTick%EW_SCOUT_INTERVAL!==0)return
  try {
    if(ewScoutTick%40===20)ewScoutRefresh(event.server)
    var count=Math.min(EW_SCOUT_BATCH,ewScoutQueue.length)
    for(var i=0;i<count;i++) {
      var entry=ewScoutQueue[(ewScoutCursor+i)%ewScoutQueue.length]
      var scout=entry.entity
      if(!scout.isAlive() || scout.isRemoved())continue
      if(ewScoutAPI.reb.isUnderReb(entry.level,scout.position()))scout.discard()
    }
    if(ewScoutQueue.length)ewScoutCursor=(ewScoutCursor+count)%ewScoutQueue.length
  } catch(ewScoutError) {
    ewScoutFailed=true
    ewScoutQueue=[]
    console.error('[EW Scouts] Compatibility error; bridge stopped until /reload: '+ewScoutError)
  }
})
