// Targeted Enderman ban; does not change any other mob or dimension.
var NE_Types=Java.loadClass('net.minecraft.world.entity.EntityType')
var neCleanupPending=true
EntityEvents.spawned(event=>{
  if(event.entity.getType()===NE_Types.ENDERMAN || event.entity.getType().equals(NE_Types.ENDERMAN))event.cancel()
})
// Once after world start or /reload. Only already loaded entities are queried.
ServerEvents.tick(event=>{
  if(!neCleanupPending)return
  neCleanupPending=false
  var levels=event.server.getAllLevels().iterator(),removed=0
  while(levels.hasNext()){
    var level=levels.next()
    var entities=level.getEntities(NE_Types.ENDERMAN,e=>!e.isRemoved())
    for(var i=0;i<entities.size();i++){
      entities.get(i).discard()
      removed++
    }
  }
  console.info('[No Endermen] Removed loaded endermen: '+removed)
})
