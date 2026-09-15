// Peacetime Forces — KubeJS 2001.6.5 / Forge 1.20.1
// Enables the ambient infantry supplied by Simple Enemy Mod + SBW: Combined Arms.
// Heavy vehicles stay out of ordinary peacetime events.

// Peacetime Forces — PMC infantry only

ServerEvents.loaded(event => {
  const server = event.server

  // Disable ambient RU/US forces.
  server.runCommandSilent('gamerule sewvRuSpawns false')
  server.runCommandSilent('gamerule sewvUsSpawns false')

  // Keep ambient PMC infantry.
  server.runCommandSilent('gamerule sewvPmcAmbientSpawns true')

  // Disable vehicles and distant military events.
  server.runCommandSilent('gamerule sewvTanksInEvents false')
  server.runCommandSilent('gamerule sewvFarEventSpawns false')

  // Disable all native SEM world events.
  server.runCommandSilent('sem event military_patrol active false')
  server.runCommandSilent('sem event far_combat active false')
  server.runCommandSilent('sem event cave_extraction active false')

  console.info('[Peacetime Forces] Only ambient PMC infantry is enabled.')
})
