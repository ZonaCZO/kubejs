// Explicit feedback and an independent toggle endpoint. No new permissions.
function fgToggle(player){
 try{
  if(typeof fcGranted!=='function'||typeof fcSend!=='function')throw Error('Скрипт фронта не загружен.')
  if(!fcGranted(player))throw Error('Нет прав: режим ГМа доступен хосту, оператору или назначенному ГМу.')
  var enabled=!player.persistentData.getBoolean('front_coop_gm_mode')
  player.persistentData.putBoolean('front_coop_gm_mode',enabled)
  player.persistentData.putLong('front_coop_confirm',0)
  var message='Режим ГМа: '+(enabled?'ВКЛ':'ВЫКЛ')
  player.tell('[Штаб] '+message)
  fcSend(player,message)
  console.info('[GM toggle] '+player.username+': '+enabled)
  return 1
 }catch(error){
  player.tell('[Штаб] '+String(error))
  console.warn('[GM toggle] '+String(error))
  return 0
 }
}
NetworkEvents.dataReceived('front:gm_toggle',event=>fgToggle(event.player))
ServerEvents.commandRegistry(event=>{
 var C=event.commands
 event.register(C.literal('frontgm').requires(s=>s.player!=null).executes(c=>fgToggle(c.source.player)))
})
