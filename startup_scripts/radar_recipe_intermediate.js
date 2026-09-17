// Required by the restored Create Radar sequenced assembly. Restart the whole game.
StartupEvents.registry('item', function (event) {
  event.create('unfinished_radar_network_filter')
    .displayName('Unfinished Radar Network Filter')
    .texture('create:item/precision_mechanism');
});
