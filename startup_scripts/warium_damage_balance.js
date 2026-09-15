const EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot')

function damageTypeId(source) {
  try { return String(source.typeHolder().unwrapKey().get().location()) } catch (ignored) {}
  try { return String(source.type().msgId()) } catch (ignored) {}
  return ''
}

function entityNamespace(entity) {
  if (entity == null) return ''
  try { return String(entity.type.arch$registryName()).split(':')[0] } catch (ignored) {}
  try { return String(entity.type).split(':')[0] } catch (ignored) {}
  return ''
}

function juggernautPieces(player) {
  const slots = [EquipmentSlot.HEAD, EquipmentSlot.CHEST, EquipmentSlot.LEGS, EquipmentSlot.FEET]
  let pieces = 0
  slots.forEach(slot => {
    const stack = player.getItemBySlot(slot)
    if (!stack.empty && String(stack.id).startsWith('jagtaczarmor:')) pieces++
  })
  return pieces
}

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
  const player = event.entity
  if (!player || !player.isPlayer()) return

  const source = event.source
  const id = damageTypeId(source)
  const fromWarium = entityNamespace(source.directEntity) === 'crusty_chunks' || entityNamespace(source.entity) === 'crusty_chunks'
  const bypass = id === 'crusty_chunks:armor_bypass_damage' || id === 'crusty_chunks:spall_damage'
  if ((!fromWarium && !bypass) || id === 'crusty_chunks:vaporized') return

  const multipliers = [0.65, 0.58, 0.50, 0.42, 0.35]
  event.setAmount(Math.max(1.0, event.amount * multipliers[juggernautPieces(player)]))
})
