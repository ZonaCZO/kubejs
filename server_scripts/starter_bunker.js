// One finite placement job. No terrain search, world generation or chunk forcing.
var SB_Pos=Java.loadClass('net.minecraft.core.BlockPos')
var SB_Height=Java.loadClass('net.minecraft.world.level.levelgen.Heightmap$Types')
var SB_Registry=Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
var SB_RL=Java.loadClass('net.minecraft.resources.ResourceLocation')
var SB_jobs=null
var SB_drafts={}
function sbAllowed(p){return typeof fcCanEdit==='function' && fcCanEdit(p)}
function sbReply(p,s){p.tell('[Бункер] '+s)}
function sbConfig(){return JsonIO.read('kubejs/config/starter_bunker.json')}
function sbCheck(p,d){
 var world=p.level
 if(String(world.dimension)!=='minecraft:overworld')throw Error('Только обычный мир.')
 if(d.y<world.getMinBuildHeight() || d.y+44>world.getMaxBuildHeight())throw Error('Недостаточно высоты мира.')
 for(var x=d.x;x<d.x+48;x+=4)for(var z=d.z;z<d.z+48;z+=4){
  if(!world.hasChunkAt(new SB_Pos(x,d.y,z)))throw Error('Участок должен быть загружен. Подойди ближе.')
 }
 // Check both far edges too.
 if(!world.hasChunkAt(new SB_Pos(d.x+47,d.y,d.z+47)))throw Error('Участок не загружен.')
 for(var sx=0;sx<=48;sx+=8)for(var sz=0;sz<=48;sz+=8){
  var px=d.x+Math.min(sx,47),pz=d.z+Math.min(sz,47)
  var sy=world.getHeight(SB_Height.MOTION_BLOCKING_NO_LEAVES,px,pz)-1
  if(Math.abs(sy-d.ground)>3)throw Error('Слишком неровный участок: выбери ровную площадку 48x48.')
  if(!world.getFluidState(new SB_Pos(px,sy,pz)).isEmpty())throw Error('Вода/лава на площадке: выбери сухую сушу.')
 }
 var all=world.getAllEntities().iterator()
 while(all.hasNext()){
  var e=all.next()
  if(e.x>=d.x-2&&e.x<=d.x+50&&e.z>=d.z-2&&e.z<=d.z+50&&e.y>=d.y-2&&e.y<=d.y+46)
   throw Error('Отойди за границу участка; убери игроков, животных и технику из объёма.')
 }
}
function sbAction(p,action){
 try{
  if(!sbAllowed(p))throw Error('Включи режим ГМа в штабе. Нужны права хоста/назначенного ГМа.')
  var cfg=sbConfig(),server=p.server,key=String(p.uuid)
  if(!cfg||!cfg.enabled)throw Error('Установка выключена в starter_bunker.json.')
  if(action==='cancel'){delete SB_drafts[key];sbReply(p,'Предпросмотр отменён.');return 1}
  if(SB_jobs)throw Error('Установка уже выполняется.')
  if(server.persistentData.getBoolean('starter_bunker_placed'))throw Error('Стартовая база в этом мире уже установлена.')
  if(action==='preview'){
   if(String(p.level.dimension)!=='minecraft:overworld')throw Error('Только обычный мир.')
   var ground=Math.floor(p.y)-1
   var d={x:Math.floor(p.x)-24,y:ground-19,z:Math.floor(p.z)-24,ground:ground,expires:Number(server.overworld().getGameTime())+2400}
   if(d.y<p.level.getMinBuildHeight()||d.y+44>p.level.getMaxBuildHeight())throw Error('Недостаточно высоты мира.')
   // Feet must be on the chosen ground, not flying above it.
   var support=p.level.getBlock(Math.floor(p.x),ground,Math.floor(p.z))
   if(support.id==='minecraft:air'||support.id==='minecraft:water'||support.id==='minecraft:lava')throw Error('Встань на твёрдую землю.')
   SB_drafts[key]=d
   sbReply(p,'Площадка: X '+d.x+'..'+(d.x+47)+', Z '+d.z+'..'+(d.z+47)+'. Пол двора Y='+ground+'. Объём Y='+d.y+'..'+(d.y+43)+'.')
   sbReply(p,'ВНИМАНИЕ: весь объём будет заменён, включая грунт и любые постройки! Нужен свободный ровный сухой участок и резервная копия мира.')
   sbReply(p,'Отойди за границу минимум на 3 блока, оставайся рядом. /starterbase confirm — установить; /starterbase cancel — отменить. Подтверждение действует 2 минуты.')
   return 1
  }
  var draft=SB_drafts[key]
  if(!draft||draft.expires<Number(server.overworld().getGameTime()))throw Error('Сначала /starterbase preview на уровне будущего двора.')
  sbCheck(p,draft)
  for(var i=0;i<(cfg.requiredBlocks||[]).length;i++){
   if(!SB_Registry.BLOCKS.containsKey(new SB_RL(String(cfg.requiredBlocks[i]))))
    throw Error('Нет блока '+cfg.requiredBlocks[i]+'. Установи нужный мод, иначе база будет повреждена.')
  }
  // Refuse missing templates before clearing anything.
  var manager=server.overworld().getStructureManager()
  var RL=Java.loadClass('net.minecraft.resources.ResourceLocation')
  var template=manager.get(new RL(String(cfg.template)))
  if(!template.isPresent())throw Error('NBT не найден. Перезапусти игру после установки пакета.')
  var size=template.get().getSize()
  if(size.getX()!==48||size.getY()!==44||size.getZ()!==48)throw Error('Неверный размер шаблона.')
  // Prevent loss on concurrent confirmations and on reload halfway through.
  server.persistentData.putBoolean('starter_bunker_placed',true)
  SB_jobs={draft:draft,player:p,index:0,ticks:0,template:String(cfg.template),server:server}
  delete SB_drafts[key]
  sbReply(p,'Установка началась. Не заходите в участок до сообщения о завершении. Не делайте /reload и не закрывайте мир.')
  return 1
 }catch(error){sbReply(p,String(error));return 0}
}
ServerEvents.commandRegistry(event=>{
 var C=event.commands
 event.register(C.literal('starterbase').requires(s=>s.player!=null)
  .then(C.literal('preview').executes(c=>sbAction(c.source.player,'preview')))
  .then(C.literal('confirm').executes(c=>sbAction(c.source.player,'confirm')))
  .then(C.literal('cancel').executes(c=>sbAction(c.source.player,'cancel'))))
})
ServerEvents.tick(event=>{
 if(!SB_jobs)return
 var job=SB_jobs
 if(++job.ticks%10!==0)return
 var d=job.draft
 try{
  // Up to 9,216 blocks per pass, below vanilla fill limit.
  if(job.index<44){
   for(var cx=d.x;cx<=d.x+48;cx+=8)for(var cz=d.z;cz<=d.z+48;cz+=8)
    if(!event.server.overworld().hasChunkAt(new SB_Pos(Math.min(cx,d.x+47),d.y,Math.min(cz,d.z+47))))throw Error('Участок выгружен. Не отходите далеко во время установки.')
   var top=Math.min(job.index+3,43)
   var result=event.server.runCommandSilent('execute in minecraft:overworld run fill '+d.x+' '+(d.y+job.index)+' '+d.z+' '+(d.x+47)+' '+(d.y+top)+' '+(d.z+47)+' minecraft:air replace')
   // /fill also returns zero when the whole slice is already air.
   job.index=top+1
   return
  }
  var count=event.server.runCommandSilent('execute in minecraft:overworld run place template '+job.template+' '+d.x+' '+d.y+' '+d.z+' none none 1.0 0')
  if(count<=0)throw Error('Размещение шаблона не удалось. Объём уже расчищен: восстанови резервную копию. Не продолжай играть в повреждённом мире.')
  event.server.persistentData.putString('starter_bunker_location',JSON.stringify(d))
  sbReply(job.player,'База установлена. Двор Y='+d.ground+'. Проверь двери, трубы и питание. Фронт и безопасная зона НЕ изменены: отметь базу как мирную территорию через штаб.')
  SB_jobs=null
 }catch(error){
  try{sbReply(job.player,'ОШИБКА: '+error+'. Установка остановлена; при повреждении участка восстанови резервную копию.')}catch(ignored){}
  console.error('[Starter bunker] '+error)
  SB_jobs=null
 }
})
