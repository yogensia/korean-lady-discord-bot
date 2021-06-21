const common = require('../utils/common')

const run = (client, msg, args) => {
  // Send command list in a nice and clean embed.
  msg.channel.send({
    embeds: [{
      color: 3447003,
      title: 'Movie Night Info',
      url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/MOVIENIGHT.md#readme',
      description: 'Follow this link for information, tips & troubleshooting regarding movie night!'
    }]
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'movienight',
  desc: 'Shows a link with information, tips & troubleshooting regarding movie night.',
  aliases: ['movies', 'mn'],
  usage: 'movienight',
  run
}
