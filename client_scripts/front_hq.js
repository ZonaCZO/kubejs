// kubejs/client_scripts/front_hq.js
var frontHqData = {
  stateName: 'Новое государство', sector: '-', control: 0,
  zone: 'Нет данных', terrain: '-', supplied: true,
  garrisonLevel: 0, garrisonStrength: 0, garrisonMax: 0
}
var frontHqNameInput = 'Новое государство'

NetworkEvents.dataReceived('front:hq_data', event => {
  frontHqData = event.data
  frontHqNameInput = String(frontHqData.stateName)
  GuiJS.open('front:headquarters')
})

GUIEvents.createUI('front:headquarters', event => {
  var screenW = Client.window.guiScaledWidth
  var screenH = Client.window.guiScaledHeight
  var bgW = 300
  var bgH = 210
  var bgX = (screenW - bgW) / 2
  var bgY = (screenH - bgH) / 2

  event.setBackground('minecraft:textures/gui/demo_background.png', bgX, bgY, bgW, bgH)
  event.pauseGame(false)
  event.background(true)

  event.label('§lШТАБ — ' + String(frontHqData.stateName), bgX + 14, bgY + 12)
  event.label('Сектор: ' + String(frontHqData.sector), bgX + 14, bgY + 32)
  event.label('Обстановка: ' + String(frontHqData.zone), bgX + 14, bgY + 44)
  event.label('Контроль Warium: ' + String(frontHqData.control) + '%', bgX + 14, bgY + 56)
  event.label('Местность: ' + String(frontHqData.terrain), bgX + 14, bgY + 68)
  event.label('ТрО: уровень ' + String(frontHqData.garrisonLevel) + ', бойцов ' +
    String(frontHqData.garrisonStrength) + '/' + String(frontHqData.garrisonMax), bgX + 14, bgY + 80)

  event.button('Разместить ТрО (2 ящика)', bgX + 14, bgY + 102, 132, 20).onClick(() => {
    Client.player.sendData('front:hq_request', {action: 'garrison'})
  })
  event.button('Улучшить ТрО (3/4)', bgX + 154, bgY + 102, 132, 20).onClick(() => {
    Client.player.sendData('front:hq_request', {action: 'upgrade'})
  })
  event.button('Коммандос (4 ящика)', bgX + 14, bgY + 128, 132, 20).onClick(() => {
    Client.player.sendData('front:hq_request', {action: 'commando'})
  })
  event.button('Обновить обстановку', bgX + 154, bgY + 128, 132, 20).onClick(() => {
    Client.player.sendData('front:hq_request', {action: 'refresh'})
  })

  event.label('Название государства:', bgX + 14, bgY + 158)
  event.textBox(bgX + 14, bgY + 172, 190, 18)
    .setValue(String(frontHqNameInput))
    .onTextChanged(text => { frontHqNameInput = String(text) })
  event.button('Сохранить', bgX + 212, bgY + 171, 74, 20).onClick(() => {
    Client.player.sendData('front:hq_request', {action: 'state_name', name: frontHqNameInput})
  })
})
