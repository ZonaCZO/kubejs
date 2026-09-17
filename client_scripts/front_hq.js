var frontHqData={},frontHqNameInput='',frontEnemyInput='',frontHqTab='overview',frontResetConfirm=false
var frontTexts={
 ru:{hq:'ОПЕРАТИВНЫЙ ШТАБ',overview:'Обзор',state:'Государство',gm:'ГМ',cheats:'Читы',sector:'Сектор',control:'Контроль',tro:'ТрО',deploy:'Разместить ТрО (2)',upgrade:'Улучшить ТрО (3/4)',map:'Метки Xaero',services:'Почта / профиль / задачи',refresh:'Обновить',save:'Сохранить',enemy:'Название противника',outside:'Вне зоны БД',safe:'Безопасная зона',front:'Линия фронта',free:'Свободная зона',enemyZone:'Зона противника',pause:'Пауза войны',resume:'Продолжить войну',minus:'Контроль −25%',plus:'Контроль +25%',gmInfo:'Изменяется зона, в которой ты стоишь',supplies:'Выдать 4 ящика припасов',heal:'Восстановить здоровье',purge:'Удалить роботов директора',reset:'Сбросить войну',confirm:'ПОДТВЕРДИТЬ СБРОС',admin:'Только операторы сервера',paused:'ВОЙНА НА ПАУЗЕ'},
 uk:{hq:'ОПЕРАТИВНИЙ ШТАБ',overview:'Огляд',state:'Держава',gm:'ГМ',cheats:'Чити',sector:'Сектор',control:'Контроль',tro:'ТрО',deploy:'Розмістити ТрО (2)',upgrade:'Покращити ТрО (3/4)',map:'Мітки Xaero',services:'Пошта / профіль / завдання',refresh:'Оновити',save:'Зберегти',enemy:'Назва противника',outside:'Поза зоною БД',safe:'Безпечна зона',front:'Лінія фронту',free:'Вільна зона',enemyZone:'Зона противника',pause:'Пауза війни',resume:'Продовжити війну',minus:'Контроль −25%',plus:'Контроль +25%',gmInfo:'Змінюється зона, у якій ти стоїш',supplies:'Видати 4 ящики припасів',heal:'Відновити здоров’я',purge:'Прибрати роботів директора',reset:'Скинути війну',confirm:'ПІДТВЕРДИТИ СКИДАННЯ',admin:'Лише оператори сервера',paused:'ВІЙНА НА ПАУЗІ'},
 en:{hq:'OPERATIONS HEADQUARTERS',overview:'Overview',state:'State',gm:'GM',cheats:'Cheats',sector:'Sector',control:'Control',tro:'Defence',deploy:'Deploy defence (2)',upgrade:'Upgrade defence (3/4)',map:'Xaero waypoints',services:'Mail / profile / operations',refresh:'Refresh',save:'Save',enemy:'Enemy name',outside:'Outside war area',safe:'Safe zone',front:'Frontline',free:'Free zone',enemyZone:'Enemy zone',pause:'Pause war',resume:'Resume war',minus:'Control -25%',plus:'Control +25%',gmInfo:'Changes affect the zone you stand in',supplies:'Give 4 supply crates',heal:'Restore health',purge:'Remove director robots',reset:'Reset war',confirm:'CONFIRM WAR RESET',admin:'Server operators only',paused:'WAR PAUSED'}
}
function frontHqSend(action){Client.player.sendData('front:hq_request',{action:action})}
function frontAdminSend(action){Client.player.sendData('front:admin_request',{action:action})}
function frontSelectTab(tab){frontHqTab=tab;frontResetConfirm=false;GuiJS.open('front:headquarters')}
NetworkEvents.dataReceived('front:hq_data',event=>{
 frontHqData=event.data;frontHqNameInput=String(frontHqData.stateName);frontEnemyInput=String(frontHqData.enemyName)
 if(!frontHqData.canEdit && (frontHqTab==='gm' || frontHqTab==='cheats'))frontHqTab='overview'
 GuiJS.open('front:headquarters')
})
GUIEvents.createUI('front:headquarters',event=>{
 var t=frontTexts[String(frontHqData.language)] || frontTexts.ru,w=320,h=220
 var x=Math.floor((Client.window.guiScaledWidth-w)/2),y=Math.floor((Client.window.guiScaledHeight-h)/2)
 event.setBackground('kubejs:textures/gui/front_hq.png',x,y,w,h);event.pauseGame(false);event.background(true)
 event.label('§b§l'+t.hq,x+12,y+10)
 var tabs=frontHqData.canEdit?['overview','state','gm','cheats']:['overview','state']
 for(var i=0;i<tabs.length;i++){
  let tab=tabs[i]
  event.button((frontHqTab===tab?'§b':'§7')+t[tab],x+12+i*76,y+28,72,18).onClick(()=>frontSelectTab(tab))
 }
 var short=value=>String(value || '').slice(0,44)
 if(frontHqTab==='state'){
  event.label('§7'+t.state,x+12,y+60)
  event.textBox(x+12,y+76,208,18).setValue(frontHqNameInput).onTextChanged(v=>{frontHqNameInput=String(v)})
  event.button(t.save,x+228,y+76,80,18).onClick(()=>Client.player.sendData('front:hq_request',{action:'state_name',name:frontHqNameInput}))
  if(frontHqData.canEdit){
   event.label('§7'+t.enemy,x+12,y+110)
   event.textBox(x+12,y+126,208,18).setValue(frontEnemyInput).onTextChanged(v=>{frontEnemyInput=String(v)})
   event.button(t.save,x+228,y+126,80,18).onClick(()=>Client.player.sendData('front:hq_request',{action:'enemy_name',name:frontEnemyInput}))
  }
 } else if(frontHqTab==='gm' && frontHqData.canEdit){
  event.label('§7'+t.gmInfo,x+12,y+60)
  event.label(t.sector+': '+short(frontHqData.sector),x+12,y+78)
  event.button(frontHqData.warPaused?t.resume:t.pause,x+12,y+100,296,20).onClick(()=>frontAdminSend('pause_toggle'))
  event.button(t.minus,x+12,y+130,144,20).onClick(()=>frontAdminSend('control_minus'))
  event.button(t.plus,x+164,y+130,144,20).onClick(()=>frontAdminSend('control_plus'))
  event.label('§8'+t.admin,x+12,y+174)
 } else if(frontHqTab==='cheats' && frontHqData.canEdit){
  event.button(t.supplies,x+12,y+60,296,20).onClick(()=>frontAdminSend('supplies'))
  event.button(t.heal,x+12,y+86,296,20).onClick(()=>frontAdminSend('heal'))
  event.button(t.purge,x+12,y+112,296,20).onClick(()=>frontAdminSend('purge'))
  event.button('§c'+(frontResetConfirm?t.confirm:t.reset),x+12,y+146,296,20).onClick(()=>{
   if(frontResetConfirm){frontResetConfirm=false;frontAdminSend('reset')}else{frontResetConfirm=true;frontAdminSend('reset_arm')}
  })
 } else {
  event.label('§f§l'+short(frontHqData.stateName),x+12,y+60)
  event.label('§7'+t.sector+': §f'+short(frontHqData.sector),x+12,y+78)
  event.label(frontHqData.warPaused?'§e'+t.paused:'§b'+(t[String(frontHqData.zoneCode)] || t.enemyZone),x+12,y+94)
  event.label('§7'+short(frontHqData.enemyName)+' §8| §f'+t.control+': '+String(frontHqData.control)+'%',x+12,y+110)
  event.label('§7'+t.tro+': §f'+String(frontHqData.garrisonStrength)+'/'+String(frontHqData.garrisonMax),x+12,y+126)
  event.button(t.deploy,x+12,y+146,144,20).onClick(()=>frontHqSend('garrison'))
  event.button(t.upgrade,x+164,y+146,144,20).onClick(()=>frontHqSend('upgrade'))
  event.button(t.map,x+12,y+172,144,20).onClick(()=>frontHqSend('map'))
  event.button('HQ+',x+164,y+172,144,20).onClick(()=>Client.player.sendData('front:services_request',{action:'mail'}))
 }
 event.button(t.refresh,x+12,y+198,64,16).onClick(()=>frontHqSend('refresh'))
 event.button('Co-op',x+80,y+198,84,16).onClick(()=>Client.player.sendData('front:coop_request',{action:'view'}))
 event.button('RU',x+176,y+198,40,16).onClick(()=>Client.player.sendData('front:hq_request',{action:'language',language:'ru'}))
 event.button('UK',x+222,y+198,40,16).onClick(()=>Client.player.sendData('front:hq_request',{action:'language',language:'uk'}))
 event.button('EN',x+268,y+198,40,16).onClick(()=>Client.player.sendData('front:hq_request',{action:'language',language:'en'}))
})
