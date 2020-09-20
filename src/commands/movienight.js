const common = require('../utils/common')

const run = (client, msg, args) => {
  // Send command list in a nice and clean embed.
  msg.channel.send({
    embed: {
      color: 3447003,
      title: 'Movie Night Info',
      url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/MOVIENIGHT.md',
      description: 'Follow this link for information and tips regarding movie night!'
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'movienight',
  desc: 'Shows a link with info about Movie Nights.',
  aliases: ['movies', 'mn'],
  usage: 'movienight',
  run
}
