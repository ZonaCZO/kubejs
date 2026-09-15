// kubejs/server_scripts/front_recipes.js
// A production line intentionally needs Create machinery and cannot be bypassed
// in a normal 3x3 crafting table.
ServerEvents.recipes(event => {
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
