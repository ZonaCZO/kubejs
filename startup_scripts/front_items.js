// kubejs/startup_scripts/front_items.js
StartupEvents.registry('item', event => {
  event.create('military_supply_crate')
    .displayName('Ящик военных припасов')
    .maxStackSize(16)
    .rarity('uncommon')
})

GUIEvents.registerUI(event => {
  event.gui('front:headquarters')
})
