const { Permissions } = require('discord.js')

module.exports = async (client, member) => {
  // Get general channel so we can check for permisions first.
  const channel = await client.channels.cache.get(process.env.GENERAL_CHANNEL_ID)

  if (channel.permissionsFor(client.user).has(Permissions.FLAGS.MANAGE_ROLES)) {
    member.roles.add(process.env.NEW_MEMBER_ROLE).catch(console.error)
  } else {
    console.warn('Warning: User joined, but we don\'t have permission to edit roles!')
  }
}
