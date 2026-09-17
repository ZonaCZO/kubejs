// Optional Create integration; vanilla substitutions are independent datapack recipes.
ServerEvents.recipes(event => {
  var cfg = JsonIO.read('kubejs/config/overworld_survival.json') || {}
  if (cfg.alternativeRecipes === false) {
    event.remove({id: /^kubejs:overworld_survival\//})
    return
  }
  // Unheated brass removes the requirement to capture a Nether blaze.
  event.custom({type: 'create:mixing', ingredients: [
    {item: 'minecraft:copper_ingot'}, {item: 'create:zinc_ingot'}
  ], results: [{item: 'create:brass_ingot', count: 2}], heatRequirement: 'none'})
    .id('kubejs:overworld_survival/brass')
  event.shapeless('create:blaze_burner', ['create:empty_blaze_burner',
    'minecraft:blaze_rod', 'minecraft:blaze_rod', 'minecraft:blaze_powder'])
    .id('kubejs:overworld_survival/blaze_burner')
})
