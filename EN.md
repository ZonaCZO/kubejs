# Frontline Survival: player guide

Updated 2026-09-17. Minecraft 1.20.1 Forge, Front v9 and the latest HQ, hotkey, radio map, EW and civilian packages. This describes the supplied updates, not a guarantee that they are all installed. Combined in-game testing is still required.

## Getting started

Establish a base, gather food, weapons and ammunition, and mark your shelter in Xaero. Open headquarters with **H** or `/front hq`; use `/front status` to check your current zone. Develop Create industry for military supplies. JEI recipe/use shortcuts: R/U.

Rebind H in Controls → Key Binds → Front system → Open headquarters. It does not activate over chat or other screens. Key registration requires a full Minecraft restart, not just `/reload`.

## Frontline rules

A major sector normally measures 256×256 blocks; a tactical zone measures 64×64. These are `sectorSize` and `frontZoneSize`. With these settings, each sector contains A1–D4: letters increase eastward, numbers southward. Do not change geometry during an ongoing war without a migration plan.

Enemy control at 0% means a free zone; positive control is not an exact count of living robots. Robot kills reduce control in the small zone. When a player brings it to zero, remaining director robots in that zone are killed and temporary recapture protection begins. Allied units are not removed by this rule.

Strategic expansion and movement assigned by the director operate in active zones near Overworld players. `activeRadiusSectors` is measured in small zones. Other zones retain their control; automatic distant encirclement attrition is disabled. Other mods can still run their native AI in loaded chunks.

Mountains hinder expansion. River zones have at most a 5% crossing-attempt chance per cycle, plus a control-gain penalty. Ground robots in river-biome water receive slowness. No custom bridge-finding algorithm was added. Recognized ocean zones are excluded from waves; surface spawning checks water and safe rectangles. A marker named “base” does not create a safe zone.

The hard robot cap applies to the major sector, not separately to all its small zones.

## Headquarters, supplies and defence

Overview displays your sector/zone, control and territorial defence. State changes your RP state name; operators can also rename the enemy. **HQ+** opens mail, profile and operations. HQ supports RU/UK/EN.

The supply currency is `kubejs:military_supply_crate`. Produce it using Create 5×5 mechanical crafting; check JEI for the recipe. Default defence costs:

| Action | Crates | Total soldiers |
|---|---:|---:|
| Level I | 2 | 3 |
| Upgrade to II | 3 more | 4 |
| Upgrade to III | 4 more | 5 |

Configuration can change costs. A garrison belongs to the major sector and is deployed from a free zone inside the war area, outside safe rectangles. It supports players rather than replacing their command.

The director remembers its last census of allied soldiers and explicitly marked SBW vehicles. Only vehicles tagged `front_friendly_vehicle` count; never tag the entire mod. A fully loaded active-zone census updates the record. Units are not cloned or respawned from this count: Minecraft stores the real entities. Five strength units indicate sufficient defence, but this is information, not a virtual army. All inactive zones are frozen regardless of their force count; actual units fight when players return.

Automatic commando recruitment is removed. Players and CA tools form squads. Profile role, callsign and text emblem are cosmetic and grant no permissions. A painted portrait editor is not implemented.

## Xaero and the CC map

`/front map` supplies clickable messages for adding Xaero operational waypoints. Add them manually, remove outdated ones and request fresh markers. They do not continuously track the front.

CC requires the Military-system central server, a modem, and a `front_map` lectern next to the server. Wireless modems are supported within their range/dimension limits. Run `pr/military_map.lua`; for an advanced monitor, run `pr/military_map.lua monitor`.

The map reads Network ID and key from `.net_config.txt`, discovers `central_core`, and uses normal Military-system accounts. Passwords are not saved. Both ends need the same non-empty key. This reuses the system’s legacy cipher; it is not modern cryptographic protection.

**One network shares one set of markers.** Separate state IDs and `groups.json` are no longer required. Soldier accounts can read; commander/general accounts in the CC database can edit. Minecraft RP titles do not change these roles. Logging the same account into another application may replace its previous session.

Markers and the saved snapshot live on the central server in `data/front_map`. Old state-group markers are retained but not automatically merged into the network set. Changing Network ID selects another set.

Controls: arrows pan; +/- zoom; Tab changes war area; R refreshes; Q exits; click/touch selects; A adds a label and one Latin letter/digit; D deletes markers in the selected zone. Monitor text entry happens on the computer. North is up (-Z); east is right (+X).

Green means free, yellow frontline, red enemy-controlled. Water adds a blue tint and mountains a light tint. Terrain is approximate: up to five probes in loaded chunks only. Unknown terrain must not be assumed dry land. Survey limit: 4096 zones, one per second; snapshots update roughly every 20 game seconds. Zoom in before placing precise markers.

OFFLINE indicates a connection error/no response; STALE indicates a stored snapshot without live delivery. A marker creates neither a safe base nor a CA order.

## Mail and operations

Mail records advances, liberation and operation outcomes without chat spam. Repeated events are combined. Up to 100 entries are stored; the GUI shows the latest eight. Read status is personal.

Operations select an existing loaded robot inside the war area, within 512 blocks, without spawning extra mobs:

- Mortar operator: kill the assigned target to suppress new mortar support in its zone for 10 minutes. Existing mortar units remain.
- Supply unit (`worker`) or commander: kill the assigned target to delay strategic expansion into its zone for 10 minutes. No physical supply depot is generated.

One operation per player, 30-minute deadline. Coordinates record the position at acceptance, not live tracking. The assigned player must kill the assigned target inside the war area. Another player killing it removes the task without its effect. Successful completion starts a 10-minute cooldown. Off-front targets, difficulty tiers and anti-air operations are not implemented.

## Electronic warfare and civilians

Active, powered Electronic Warfare removes normal and raid Warium scouts within its suppression coverage, without loot, explosions or kill rewards. Mode, antenna and stationary/portable coverage come from the mod API. Other robots are unaffected. Manually placed scouts of either side are affected too. Up to 64 scouts are checked per second; large populations cause additional delay. Removal does not reduce frontline control.

`kubejs/config/civilians.json` defines English nationality labels. Origin and initial allegiance are independent and saved on the NPC. Player attacks reduce trust and raise fear; killings affect a limited number of nearby residents. Trust can change allegiance; fear is not support. Villagers Reborn personality and family relationships remain separate.

`/civilian info` near a resident shows nationality; operators also see hidden values. Automatic informing, sabotage, fleeing and economic penalties are not implemented.

CTOV villages and kogtyv TaV cities generate more frequently in new chunks only. Towns and Towers is a separate mod and was not changed. Actual placement depends on biomes and the world generator, including Lost Cities. More residents may mean more CPU load.

## GM and administrator tools

GM/Cheats tabs require operator level 2, validated server-side. GM can pause director updates and change current eligible-zone control by ±25%; editing control alone does not remove its robots. Cheats give four crates, restore health, remove director robots, or reset the war. Reset needs a second click within 10 seconds. Pause persists until manually resumed; EW and native mod AI keep running.

Player commands: `/front status`, `/front hq`, `/front map`, `/front garrison`, `/front garrison upgrade`, `/front garrison status`.

Operator commands: `/front purge` removes director robots without resetting control; `/front reset` warns; `/front reset confirm` removes frontline forces/garrisons and clears the current war, mail, tasks and defence records. Back up the world first.

Civilian editing: `/civilian set nationality Ukrainian` (label must exist in config); `/civilian set loyalty player`, `neutral` or `invader`. This selects the nearest resident within six blocks; avoid crowds.

Origins and war/safe rectangles are in `kubejs/config/front_director_v3.json`. Boundary changes are reread by the map; other settings require `/reload`. Item/key registration requires a full restart. Changing geometry mid-war needs a migration plan.

## Performance and release readiness

Limit crowded NPC/vehicle areas, chunk loaders and idle Create production. More settlements do not accelerate map surveying. Peaceful difficulty and entity cleaners can remove hostile NPCs despite PersistenceRequired; use operator `/front purge` for director robots instead.

FTB Quests includes introductory supply tasks, not every operation. Automatic trenches, reliable TaV settlement detection and a continental railway ring are not implemented.

Before a public beta, test persistence after restarts, shared markers, tab permissions, liberation and a large battle with Spark. Syntax and simulated tests do not replace actual Minecraft integration testing.
