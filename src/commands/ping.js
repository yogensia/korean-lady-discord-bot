const common = require('../utils/common')

const slash = async (client, msg, interaction, args) => {
  // Reply with an embed message.
  await interaction.reply({
    embeds: [{
      color: 0x2f3136,
      description: 'Pong!'
    }],
    ephemeral: true
  })
}

const run = (client, msg, args) => {
  // Try to react using a custom server emote.
  common.reactWithCustomEmote(client, msg, 'peepoPants', '👍')
}

module.exports = {
  name: 'ping',
  desc: 'Simple ping command to test bot is online.',
  usage: 'ping',
  slash_command: {
    description: 'Displays info about an anime'
  },
  slash,
  run
}
