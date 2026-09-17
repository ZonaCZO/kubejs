// Forge 1.20.1 / KubeJS 2001.6.5 / Survival Instinct 1.0.2.
// Additive survival recipes. No native recipes/loot removed. No tick events.
// Medical costs below are fictional game balance, not real manufacturing.
// Edit ingredients/count here to tune prices, then restart the world.
var SI_RF_RECIPES = [
  {
    "key": "spider_eye",
    "output": "minecraft:spider_eye",
    "count": 1,
    "ingredients": [
      "minecraft:brown_mushroom",
      "minecraft:red_mushroom",
      "minecraft:redstone",
      "minecraft:sugar"
    ],
    "title": "Паучий глаз"
  },
  {
    "key": "cloth",
    "output": "survival_instinct:cloth",
    "count": 1,
    "ingredients": [
      "#minecraft:wool"
    ],
    "title": "Ткань"
  },
  {
    "key": "empty_bag",
    "output": "survival_instinct:empty_bag",
    "count": 1,
    "ingredients": [
      "survival_instinct:cloth",
      "survival_instinct:cloth",
      "survival_instinct:cloth",
      "survival_instinct:cloth",
      "minecraft:leather",
      "minecraft:leather",
      "minecraft:string"
    ],
    "title": "Медицинская сумка"
  },
  {
    "key": "alcohol_wipes",
    "output": "survival_instinct:alcohol_wipes",
    "count": 3,
    "ingredients": [
      "minecraft:paper",
      "minecraft:paper",
      "minecraft:paper",
      "minecraft:honey_bottle",
      "minecraft:charcoal"
    ],
    "title": "Медицинские салфетки"
  },
  {
    "key": "analgesic",
    "output": "survival_instinct:analgesic",
    "count": 2,
    "ingredients": [
      "minecraft:dried_kelp",
      "minecraft:dried_kelp",
      "minecraft:honey_bottle",
      "minecraft:gold_nugget",
      "minecraft:gold_nugget",
      "minecraft:glass_bottle"
    ],
    "title": "Обезболивающее"
  },
  {
    "key": "antibiotics",
    "output": "survival_instinct:antibiotics",
    "count": 2,
    "ingredients": [
      "minecraft:brown_mushroom",
      "minecraft:brown_mushroom",
      "minecraft:red_mushroom",
      "minecraft:red_mushroom",
      "minecraft:honey_bottle",
      "minecraft:glowstone_dust",
      "minecraft:gold_nugget"
    ],
    "title": "Антибиотики"
  },
  {
    "key": "adrenaline_syringe",
    "output": "survival_instinct:adrenaline_syringe",
    "count": 1,
    "ingredients": [
      "minecraft:sugar",
      "minecraft:sugar",
      "minecraft:redstone",
      "minecraft:glowstone_dust",
      "minecraft:glass_pane",
      "minecraft:iron_nugget",
      "minecraft:gold_nugget"
    ],
    "title": "Шприц адреналина"
  },
  {
    "key": "morphine_syringe",
    "output": "survival_instinct:morphine_syringe",
    "count": 1,
    "ingredients": [
      "survival_instinct:analgesic",
      "minecraft:dried_kelp",
      "minecraft:glass_pane",
      "minecraft:iron_nugget",
      "minecraft:glowstone_dust",
      "minecraft:gold_nugget"
    ],
    "title": "Шприц морфина"
  },
  {
    "key": "blood_syringe",
    "output": "survival_instinct:blood_syringe",
    "count": 1,
    "ingredients": [
      "minecraft:cooked_beef",
      "minecraft:beetroot",
      "minecraft:beetroot",
      "minecraft:glass_pane",
      "minecraft:iron_nugget",
      "minecraft:gold_nugget"
    ],
    "title": "Шприц крови"
  },
  {
    "key": "energy_storage_battery",
    "output": "survival_instinct:energy_storage_battery",
    "count": 1,
    "ingredients": [
      "minecraft:copper_ingot",
      "minecraft:copper_ingot",
      "minecraft:redstone",
      "minecraft:redstone",
      "survival_instinct:steellium",
      "survival_instinct:steellium",
      "create:iron_sheet",
      "create:iron_sheet",
      "create:electron_tube"
    ],
    "title": "Аккумулятор экзоброни"
  },
  {
    "key": "exo_component",
    "output": "survival_instinct:exo_component",
    "count": 1,
    "ingredients": [
      "create:precision_mechanism",
      "create:precision_mechanism",
      "minecraft:diamond",
      "minecraft:diamond",
      "survival_instinct:steellium",
      "survival_instinct:steellium",
      "create:brass_sheet",
      "create:brass_sheet",
      "create:electron_tube"
    ],
    "title": "Компонент экзоскелета"
  },
  {
    "key": "aluminium_from_warium",
    "output": "survival_instinct:aluminium",
    "count": 1,
    "ingredients": [
      "crusty_chunks:aluminum_ingot"
    ],
    "title": "Алюминий Warium → Survival Instinct"
  }
];

ServerEvents.recipes(function (event) {
  var added = 0;
  SI_RF_RECIPES.forEach(function (recipe) {
    var references = [recipe.output].concat(recipe.ingredients);
    var missing = references.filter(function (id) {
      return id.charAt(0) !== '#' && !Item.exists(id);
    });
    if (missing.length) {
      console.error('[Survival Recipe Fixes] Skipped ' + recipe.key + ': missing ' + missing.join(', '));
      return;
    }
    event.shapeless(Item.of(recipe.output, recipe.count), recipe.ingredients)
      .id('kubejs:survival_recipe_fixes/' + recipe.key);
    added++;
  });
  console.info('[Survival Recipe Fixes] Added ' + added + '/' + SI_RF_RECIPES.length + ' recipes; native crafting and loot preserved.');
});
