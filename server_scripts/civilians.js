// Villagers Reborn 1.0.9b. Cultural identity never determines political loyalty.
var cvConfig=JsonIO.read('kubejs/config/civilians.json')
var cvBase=null,cvTest=null,cvRegistry=null,cvTicks=0
try {
 cvBase=Java.loadClass('com.javic.slimpatch.entity.AbstractRomanceVillagerEntity')
 cvTest=Java.loadClass('net.minecraft.world.level.entity.EntityTypeTest')
 cvRegistry=Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
}catch(cvMissing){console.warn('[Civilians] Villagers Reborn unavailable; disabled')}
function cvTarget(e){return cvBase && e instanceof cvBase}
function cvClamp(value){return Math.max(0,Math.min(100,Number(value)))}
function cvValue(key,fallback){var v=Number(cvConfig[key]);return isFinite(v)?v:fallback}
function cvWrite(e,state){e.persistentData.putString('civilian_v1',JSON.stringify(state))}
function cvState(e){
 var state=null
 try{state=JSON.parse(String(e.persistentData.getString('civilian_v1')) || 'null')}catch(ignored){}
 if(state)return state
 var nations=cvConfig.nationalities
 if(!nations || !nations.length)return null
 var roll=Math.random(),friendly=Math.max(0,Math.min(1,cvValue('initialPlayerSupportChance',0.2)))
 var enemy=Math.max(0,Math.min(1-friendly,cvValue('initialInvaderSupportChance',0.2)))
 state={nationality:String(nations[Math.floor(Math.random()*nations.length)]),
  loyalty:roll<friendly?'player':(roll<friendly+enemy?'invader':'neutral'),
  trust:cvClamp(cvValue('startingTrust',50)),fear:cvClamp(cvValue('startingFear',0)),version:1}
 cvWrite(e,state);return state
}
function cvQuery(level,box){return level.getEntities(cvTest.forClass(cvBase),e=>e.isAlive() && box.contains(e.position()))}
function cvNearest(player){
 var list=cvQuery(player.level,player.getBoundingBox().inflate(6)),best=null,distance=36
 for(var i=0;i<list.size();i++){
  var e=list.get(i),d=e.distanceToSqr(player)
  if(d<distance){best=e;distance=d}
 }
 return best
}
function cvAdjust(e,trust,fear){
 var state=cvState(e);if(!state)return
 state.trust=cvClamp(state.trust+trust);state.fear=cvClamp(state.fear+fear)
 if(state.trust<=20)state.loyalty='invader'
 else if(state.trust>=80)state.loyalty='player'
 // Fear is NOT allegiance and does not automatically make anyone loyal.
 cvWrite(e,state)
}
EntityEvents.hurt(event=>{
 if(!cvBase || !cvConfig.enabled || !cvTarget(event.entity))return
 var source=null
 try{source=event.source.getEntity()}catch(ignored){source=event.source.actual}
 if(!source)return
 if(source.isPlayer())cvAdjust(event.entity,-cvValue('playerAttackTrustLoss',12),cvValue('playerAttackFearGain',18))
 else {
  var id=String(cvRegistry.ENTITY_TYPES.getKey(source.getType()))
  if(id.indexOf('crusty_chunks:')===0)cvAdjust(event.entity,cvValue('invaderAttackTrustGain',4),cvValue('playerAttackFearGain',18))
 }
})
EntityEvents.death(event=>{
 if(!cvBase || !cvConfig.enabled || !cvTarget(event.entity))return
 var killer=null
 try{killer=event.source.getEntity()}catch(ignored){killer=event.source.actual}
 if(!killer || !killer.isPlayer())return
 var list=cvQuery(event.entity.level,event.entity.getBoundingBox().inflate(Math.max(1,Math.min(64,cvValue('nearbyDeathRadius',32)))))
 for(var i=0;i<Math.min(32,list.size());i++)cvAdjust(list.get(i),-cvValue('civilianDeathTrustLoss',8),cvValue('civilianDeathFearGain',12))
})
ServerEvents.tick(event=>{
 if(!cvBase || !cvConfig.enabled)return
 cvTicks++;if(cvTicks%1200!==0)return
 var levels=event.server.getAllLevels().iterator(),seen={},budget=64
 while(levels.hasNext() && budget>0){
  var level=levels.next(),players=level.players
  for(var q=0;q<players.size() && budget>0;q++){
   var p=(q+Math.floor(cvTicks/1200))%players.size()
   var list=cvQuery(level,players.get(p).getBoundingBox().inflate(64))
   for(var i=0;i<list.size() && budget>0;i++){
    var e=list.get((i+Math.floor(cvTicks/1200)*64)%list.size()),id=String(e.uuid);if(seen[id])continue
    seen[id]=true;budget--
    var state=cvState(e)
    if(state && state.fear>0){state.fear=cvClamp(state.fear-cvValue('fearRecoveryPerMinute',1));cvWrite(e,state)}
   }
  }
 }
})
ServerEvents.commandRegistry(event=>{
 var C=event.commands,S=Java.loadClass('com.mojang.brigadier.arguments.StringArgumentType')
 function apply(context,field){
  if(!cvBase || !cvConfig.enabled || !context.source.player)return 0
  var player=context.source.player,e=cvNearest(player)
  if(!e){player.tell('No civilian within 6 blocks.');return 0}
  var state=cvState(e);if(!state)return 0
  if(field==='info'){
   player.tell('Nationality: '+state.nationality)
   if(player.hasPermissions(2))player.tell('GM: loyalty='+state.loyalty+' trust='+state.trust+' fear='+state.fear)
   return 1
  }
  var value=String(S.getString(context,'value')),allowed=false
  if(field==='nationality')for(var i=0;i<cvConfig.nationalities.length;i++)if(value===String(cvConfig.nationalities[i]))allowed=true
  if(field==='loyalty')allowed=['player','neutral','invader'].indexOf(value)>=0
  if(!allowed){player.tell('Invalid value. Check civilians.json / player, neutral, invader.');return 0}
  state[field]=value;cvWrite(e,state);player.tell('Civilian updated.');return 1
 }
 event.register(C.literal('civilian').then(C.literal('info').executes(c=>apply(c,'info')))
  .then(C.literal('set').requires(s=>s.hasPermission(2))
   .then(C.literal('nationality').then(C.argument('value',S.word()).executes(c=>apply(c,'nationality'))))
   .then(C.literal('loyalty').then(C.argument('value',S.word()).executes(c=>apply(c,'loyalty'))))))
})
