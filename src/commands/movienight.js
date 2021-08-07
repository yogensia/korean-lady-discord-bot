const common = require('../utils/common')

const construct = (client, msg, args) => {
  // Send command list in a nice and clean embed.
  return {
    color: 3447003,
    title: 'Movie Night Info',
    url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/MOVIENIGHT.md#readme',
    description: 'Follow this link for information, tips & troubleshooting regarding movie night!'
  }
}

const slash = async (client, msg, interaction, args) => {
  // Reply with an embed message.
  await interaction.reply({
    embeds: [construct(client, msg, args)],
    ephemeral: true
  })
}

const run = (client, msg, args) => {
  // Reply with an embed message.
  common.sendEmbedObject(msg, construct(client, msg, args))
}

module.exports = {
  name: 'movienight',
  desc: 'Shows a link with information, tips & troubleshooting regarding movie night.',
  aliases: ['movies', 'mn'],
  usage: 'movienight',
  slash_command: {
    description: 'Shows a link with information about movie nights'
  },
  slash,
  run
}
