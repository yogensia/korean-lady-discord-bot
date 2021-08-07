const common = require('../utils/common')

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return

  // Create custom message object to provide some data needed by commands.
  const msg = {
    author: {
      id: interaction.user.id,
      username: interaction.user.username
    },
    member: {
      displayName: interaction.member.nickname
    },
    channel: await client.channels.cache.get(interaction.channelId)
  }

  // Get command.
  const cmd = client.commands.get(interaction.commandName)

  // Check current channel and if this command is considered spam.
  if (cmd.spam && msg.channel.id !== process.env.SPAM_CHANNEL_ID) {
    const emoteThanks = common.getCustomEmote(client, 'ihaa', '❤')

    return interaction.reply({
      embeds: [{
        color: 0x2f3136,
        description: `Sorry, the **${cmd.name}** command is a bit too spammy for this channel, please use it in <#${client.spamChannel.id}> instead. Thank you! ${emoteThanks}`
      }],
      ephemeral: true
    })
  }

  // Get argument array.
  const args = []
  interaction.options.data.forEach(option => {
    args.push(option.value)
  })

  cmd.slash(client, msg, interaction, args)
}
