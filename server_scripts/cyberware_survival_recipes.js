// Cyber Ware Port 1.7.1 / KubeJS 2001.6.5 / Forge 1.20.1.
// Survival alternatives: ten raw components and seventeen selected implants.
// Native recipes remain. No mob spawning, startup registry changes or ticking.
// Edit ingredients here to tune costs. Outputs deliberately stay at one.
// Implant recipes retain native assembly costs and add a precision mechanism.
var CW_SURVIVAL_RECIPES = [
  {
    "output": "cyber_ware_port:component_actuator",
    "ingredients": [
      "minecraft:iron_ingot",
      "minecraft:iron_ingot",
      "minecraft:redstone",
      "create:cogwheel"
    ]
  },
  {
    "output": "cyber_ware_port:component_fiberoptics",
    "ingredients": [
      "minecraft:glass",
      "minecraft:glass",
      "minecraft:quartz",
      "minecraft:copper_ingot",
      "minecraft:redstone"
    ]
  },
  {
    "output": "cyber_ware_port:component_fullerene",
    "ingredients": [
      "minecraft:coal",
      "minecraft:coal",
      "minecraft:obsidian",
      "minecraft:diamond",
      "create:iron_sheet"
    ]
  },
  {
    "output": "cyber_ware_port:component_microelectric",
    "ingredients": [
      "minecraft:copper_ingot",
      "minecraft:copper_ingot",
      "minecraft:redstone",
      "minecraft:redstone",
      "minecraft:gold_ingot"
    ]
  },
  {
    "output": "cyber_ware_port:component_plating",
    "ingredients": [
      "create:iron_sheet",
      "create:iron_sheet",
      "minecraft:iron_ingot",
      "minecraft:gold_nugget"
    ]
  },
  {
    "output": "cyber_ware_port:component_reactor",
    "ingredients": [
      "minecraft:cooked_beef",
      "minecraft:cooked_beef",
      "minecraft:copper_ingot",
      "minecraft:redstone_block",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:component_ssc",
    "ingredients": [
      "minecraft:redstone",
      "minecraft:redstone",
      "minecraft:quartz",
      "minecraft:gold_ingot",
      "create:electron_tube"
    ]
  },
  {
    "output": "cyber_ware_port:component_storage",
    "ingredients": [
      "minecraft:copper_ingot",
      "minecraft:copper_ingot",
      "minecraft:redstone_block",
      "minecraft:iron_ingot",
      "minecraft:coal"
    ]
  },
  {
    "output": "cyber_ware_port:component_synthnerves",
    "ingredients": [
      "minecraft:string",
      "minecraft:string",
      "minecraft:redstone",
      "minecraft:slime_ball",
      "minecraft:copper_ingot"
    ]
  },
  {
    "output": "cyber_ware_port:component_titanium",
    "ingredients": [
      "create:iron_sheet",
      "create:iron_sheet",
      "minecraft:iron_ingot",
      "minecraft:diamond",
      "create:andesite_alloy"
    ]
  },
  {
    "output": "cyber_ware_port:bone_upgrades_bonebattery",
    "ingredients": [
      "cyber_ware_port:component_storage",
      "cyber_ware_port:component_storage",
      "cyber_ware_port:component_titanium",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:brain_upgrades_cortical_stack",
    "ingredients": [
      "cyber_ware_port:component_storage",
      "cyber_ware_port:component_storage",
      "cyber_ware_port:component_ssc",
      "cyber_ware_port:component_microelectric",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:brain_upgrades_radio",
    "ingredients": [
      "cyber_ware_port:component_ssc",
      "cyber_ware_port:component_fiberoptics",
      "minecraft:note_block",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:cybereye_upgrades_hudjack",
    "ingredients": [
      "cyber_ware_port:component_ssc",
      "cyber_ware_port:component_ssc",
      "cyber_ware_port:component_microelectric",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:cybereye_upgrades_night_vision",
    "ingredients": [
      "cyber_ware_port:component_fiberoptics",
      "cyber_ware_port:component_fiberoptics",
      "cyber_ware_port:component_microelectric",
      "minecraft:glowstone_dust",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:cybereye_upgrades_zoom",
    "ingredients": [
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_fiberoptics",
      "minecraft:glass_pane",
      "minecraft:glass_pane",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:cybereyes",
    "ingredients": [
      "cyber_ware_port:component_plating",
      "cyber_ware_port:component_plating",
      "cyber_ware_port:component_fiberoptics",
      "cyber_ware_port:component_fiberoptics",
      "cyber_ware_port:component_ssc",
      "minecraft:glass_pane",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:cyberheart",
    "ingredients": [
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_plating",
      "cyber_ware_port:component_microelectric",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:cyberlimbs_cyberarm_left",
    "ingredients": [
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_plating",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:cyberlimbs_cyberarm_right",
    "ingredients": [
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_plating",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:cyberlimbs_cyberleg_left",
    "ingredients": [
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_plating",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:cyberlimbs_cyberleg_right",
    "ingredients": [
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_actuator",
      "cyber_ware_port:component_plating",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:dense_battery",
    "ingredients": [
      "cyber_ware_port:component_plating",
      "cyber_ware_port:component_storage",
      "cyber_ware_port:component_storage",
      "cyber_ware_port:component_microelectric",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:hand_upgrades_mining",
    "ingredients": [
      "cyber_ware_port:component_titanium",
      "cyber_ware_port:component_plating",
      "cyber_ware_port:component_plating",
      "cyber_ware_port:component_actuator",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:lower_organs_upgrades_battery",
    "ingredients": [
      "cyber_ware_port:component_storage",
      "cyber_ware_port:component_storage",
      "cyber_ware_port:component_plating",
      "cyber_ware_port:component_microelectric",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:lungs_upgrades_oxygen",
    "ingredients": [
      "cyber_ware_port:component_plating",
      "cyber_ware_port:component_plating",
      "cyber_ware_port:component_actuator",
      "create:precision_mechanism"
    ]
  },
  {
    "output": "cyber_ware_port:skin_upgrades_solar_skin",
    "ingredients": [
      "cyber_ware_port:component_microelectric",
      "cyber_ware_port:component_microelectric",
      "cyber_ware_port:component_fiberoptics",
      "minecraft:quartz",
      "create:precision_mechanism"
    ]
  }
];

ServerEvents.recipes(function (event) {
  var added = 0;
  CW_SURVIVAL_RECIPES.forEach(function (recipe) {
    var missing = [recipe.output].concat(recipe.ingredients).filter(function (id) {
      return !Item.exists(id);
    });
    if (missing.length > 0) {
      console.error('[Cyberware Survival] Skipped ' + recipe.output + ': missing ' + missing.join(', '));
      return;
    }
    event.shapeless(Item.of(recipe.output, 1), recipe.ingredients)
      .id('kubejs:cyberware_survival/' + recipe.output.split(':')[1]);
    added++;
  });
  console.info('[Cyberware Survival] Added ' + added + '/' + CW_SURVIVAL_RECIPES.length + ' recipes; native recipes unchanged.');
});
