/**
 * COMMAND: !help
 *
 * Shows a link to command list in documentation.
 */
exports.run = (client, msg, args) => {
  // Send documentation link in a nice and clean embed.
  msg.channel.send({
    embed: {
      color: 3447003,
      title: 'KoreanLady Commands',
      url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/COMMANDS.md#koreanlady-discord-bot',
      description: 'Here you will find all commands available and their usage!\nYou can also DM me to test commands!'
    }
  })
}
