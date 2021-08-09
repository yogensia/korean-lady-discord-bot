const common = require('../utils/common')

const slash = async (client, msg, interaction, args) => {
  // Reply with an embed message.
  common.interactionReply(interaction, 'Pong!', true)
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
    description: 'Confirms bot is online by answering ping'
  },
  slash,
  run
}
