module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return
  // console.log(interaction)

  // Create custom message object to provide some data needed by commands.
  const msg = {
    author: {
      username: interaction.user.username
    },
    member: {
      displayName: interaction.member.nickname
    },
    channel: await client.channels.cache.get(interaction.channelID)
  }

  // Get command.
  const cmd = client.commands.get(interaction.commandName)

  // Get argument array.
  const args = []
  interaction.options.forEach(option => {
    args.push(option.value)
  })

  // await interaction.reply(cmd.process(client, msg, interaction, args))
  cmd.slash(client, msg, interaction, args)
}
