const run = (client, msg, args) => {
  // Send general documentation link in a nice and clean embed.
  msg.channel.send({
    embed: {
      color: 3447003,
      title: 'KoreanLady Commands',
      url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/COMMANDS.md#koreanlady-discord-bot',
      description: 'Here you will find all commands available and their usage!',
      footer: {
        text: 'Tip: You can also DM me to test commands!'
      }
    }
  })
}

module.exports = {
  name: 'list',
  desc: 'Lists all available commands.',
  aliases: ['commands'],
  usage: 'list',
  run
}
