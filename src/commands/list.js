const common = require('../utils/common')

const run = (client, msg, args) => {
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

  // Send command list in a nice and clean embed.
  msg.channel.send({
    embed: {
      color: 3447003,
      title: 'KoreanLady Commands',
      url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/COMMANDS.md#koreanlady-discord-bot',
      description,
      footer: {
        text: 'Tip: You can also DM me and type `help` for more info!'
      }
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'list',
  desc: 'Lists all available commands.',
  aliases: ['commands', 'commandlist'],
  usage: 'list',
  run
}
