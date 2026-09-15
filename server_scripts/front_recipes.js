// kubejs/server_scripts/front_recipes.js
// A production line intentionally needs Create machinery and cannot be bypassed
// in a normal 3x3 crafting table.
ServerEvents.recipes(event => {
  // Startup registry changes require a full client restart. During an in-game
  // script reload, skip the recipe instead of producing an empty-result error.
  if (!Item.exists('kubejs:military_supply_crate')) {
    console.warn('[Front Director] Supply crate is not registered yet. Fully restart Minecraft.')
    return
  }
  event.recipes.create.mechanical_crafting('kubejs:military_supply_crate', [
    ' ISI ',
    'IPFPI',
    'SBRBS',
    'IPFPI',
    ' ISI '
  ], {
    I: 'minecraft:iron_ingot',
    S: 'create:iron_sheet',
    P: 'minecraft:paper',
    F: 'minecraft:cooked_beef',
    B: 'minecraft:barrel',
    R: 'minecraft:redstone'
  }).id('front:mechanical_crafting/military_supply_crate')
})
