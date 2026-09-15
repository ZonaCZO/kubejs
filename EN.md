# Modpack Wiki: Frontline Survival

## 1. About the modpack

This is a military survival and role-playing modpack for Minecraft 1.20.1 Forge. The world contains cities, suburbs, villages, forests and mountains. A dynamic war against Warium is in progress: robots spread control from an expansion origin, capture neighbouring sectors and form a moving frontline.

Players do not have to attack constantly. You can establish your own state, protect settlements, develop Create industry, build logistics, deploy territorial defence units and conduct raids with small squads.

## 2. First steps

1. Create a world and allow the nearby chunks to finish loading.
2. Open the Xaero map and mark your base.
3. Run `/front status` to inspect your current sector.
4. Run `/front map` to receive operational Xaero waypoints.
5. Find a safe location away from the active frontline and build a temporary shelter.
6. Collect iron, food, redstone and Create materials.
7. Build a production line for military supply crates.

JEI displays recipes: hover over an item and press `R` for its recipe or `U` for its uses.

## 3. Sector warfare

The map is divided into invisible 256×256-block sectors.

- `0%` Warium control means free territory.
- `1–99%` means contested or actively captured territory.
- `100%` means stable Warium rear territory.
- A frontline sector borders free territory.
- An encircled Warium sector loses control when its connection to the expansion origin is cut.
- Mountains and rivers slow robot expansion.
- Cities contain stronger resistance and a higher concentration of robots.
- Frontline robots should not spawn inside configured safe zones.

Destroying robots reduces Warium control. When a player reduces sector control to zero, the sector is liberated, remaining frontline robots are removed and the territory receives temporary protection from immediate recapture.

## 4. Player commands

`/front status` — show the current sector, control, terrain, supply connection and garrison.

`/front hq` — open the GuiJS headquarters screen.

`/front map` — send nearby frontline locations as clickable Xaero messages.

`/front garrison` — deploy territorial defence in the current free sector.

`/front garrison upgrade` — upgrade the deployed garrison.

`/front garrison status` — inspect the sector garrison.

`/front squad commando` — call your personal commando squad.

## 5. Xaero waypoints

After running `/front map`, click `[Add]` next to the required messages.

- Gold `TMP_FRONT` — nearest frontline sector.
- Purple `TMP_ENCIRCLED` — encircled Warium sector.
- Red `TMP_WARIUM_ORIGIN` — expansion origin.
- Green `TMP_NEAREST_GARRISON` — nearest territorial defence unit.
- Aqua `TMP_SAFE_BASE` — nearest safe base.

`TMP` identifies an operational waypoint that may become outdated. Delete old points and run `/front map` again periodically because the frontline moves.

## 6. Military supplies

The main military currency is the `Military Supply Crate` (`kubejs:military_supply_crate`). It is produced in a 5×5 Create Mechanical Crafter arrangement. Check JEI for the exact recipe.

Current costs:

- Deploy level I territorial defence: 2 crates and 3 soldiers.
- Upgrade to level II: 3 additional crates and 4 soldiers in total.
- Upgrade to level III: 4 additional crates and 5 soldiers in total.
- Fully upgrade one sector: 9 crates in total.
- Call a four-person commando squad: 4 crates.

Territorial defence can only be deployed inside the war area, in a completely free sector and outside safe zones.

## 7. States and territorial defence

Every player can enter the name of their state through `/front hq`. The name changes how the territorial defence is presented but does not change the underlying NPC type.

Territorial defence delays enemy expansion and protects liberated sectors. It does not replace the player or a main assault force. If a garrison takes losses, inspect and support the sector personally.

Commandos are a mobile personal squad intended for raids and limited operations. Each player may have one active commando squad at a time.

## 8. Conducting operations

1. Reconnoitre the direction of the frontline with `/front map`.
2. Select one frontline sector instead of attacking the entire line.
3. Prepare storage, food, ammunition and an escape route.
4. Destroy robots using small, capable groups.
5. Deploy territorial defence after liberation.
6. Cut neighbouring sectors off to create an encirclement.
7. Use mountains, forests and rivers for defence and guerrilla operations.
8. Avoid keeping excessive NPCs and vehicles in one loaded area, as this reduces TPS.

## 9. Civilian life and settlements

Cities and villages can serve as civilian centres, suburbs, industrial districts and military bases. Protect residents, roads, railway junctions and production. Losing logistics makes frontline supply difficult even when the main base is far from Warium.

PMC units act as neutral or hired forces. Russian SEM/SEW units are disabled by the modpack. Some friendly entity IDs may retain old technical naming, but players choose their visible state name themselves.

## 10. FTB Quests

Open the FTB Quests book. The introductory “Frontline Operations” chapter explains supply production and reserve preparation. The frontline system also tracks liberated sectors, garrison deployments, commando calls and consumed supplies for future quests.

## 11. Performance

- Do not leave huge groups of NPCs in loaded chunks.
- Add shut-off controls to large Create contraptions.
- Disable unused farms and production lines.
- Avoid loading many distant areas simultaneously.
- Check `/front status` before travelling. Generating unnecessary terrain increases server load.

## 12. Administrator commands

These commands require operator permission:

- `/front purge` — remove frontline robots while preserving territorial control.
- `/front reset` — display the full-reset warning.
- `/front reset confirm` — remove frontline forces and garrisons, clear the war state and restart expansion from its origin.

Create a world backup before performing a full reset.

