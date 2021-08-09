const common = require('../utils/common')

const construct = (client, msg, args) => {
  // Build description string.
  let description = `Here's a list of all available commands.\n\nFor more details on an specific command you can type: \`${process.env.PREFIX}help <command>\`\n\n`

  let commandList = []
  client.commands.forEach((value, key, map) => {
    commandList.push(`\`${process.env.PREFIX}${value.name}\``)
  })

  // Append commands to description string.
  commandList = commandList.join(', ')
  description += `${commandList}\n\n`
  description += 'For a detailed list of commands and their usage check the link at the top of this message.'

  // Return command list in a nice and clean embed.
  return {
    color: 3447003,
    title: 'KoreanLady Commands',
    url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/COMMANDS.md#koreanlady-discord-bot',
    description,
    footer: {
      text: 'Tip: You can also DM me and type `help` for more info!'
    }
  }
}

const slash = (client, msg, interaction, args) => {
  // Reply with an embed message.
  common.interactionObjectReply(interaction, [construct(client, msg, args)], true)
}

const run = (client, msg, args) => {
  // Reply with an embed message.
  common.sendEmbedObject(msg, construct(client, msg, args))
}

module.exports = {
  name: 'list',
  desc: 'Lists all available commands.',
  aliases: ['commands', 'commandlist'],
  usage: 'list',
  slash_command: {
    description: 'Lists all available commands'
  },
  slash,
  run
}
