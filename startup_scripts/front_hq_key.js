// Register on the MOD bus, not ForgeEvents/server_scripts.
// Client-only classes are loaded only when the client registration event fires.
ForgeModEvents.onEvent('net.minecraftforge.client.event.RegisterKeyMappingsEvent',event=>{
  var FrontKeyMapping=Java.loadClass('net.minecraft.client.KeyMapping')
  global.frontHqKey=new FrontKeyMapping('key.front.open_hq',72,'key.categories.front')
  event.register(global.frontHqKey)
})
