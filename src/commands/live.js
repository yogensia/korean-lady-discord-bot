const common = require('../utils/common')
const random = require('../utils/random')
const twitch = require('../utils/twitch')

const run = (client, msg, args) => {
  // Guild owner only command.
  if (msg.guild.ownerID !== msg.author.id) {
    return common.sendErrorMsg(msg, 'Sorry, only the server owner can use this command.')
  }

  // Request stream info from Twitch API.
  twitch.request('streams?user_login=gamesdonequick')
    .then((stream) => {
      // Send an embed message with the stream details.
      msg.channel.send({
        embed: {
          color: 0xFFA820,
          title: stream.title,
          description: `**${random.exclamation()} Apollo is going live!**`,
          url: `https://twitch.tv/${stream.user_name.toLowerCase()}`,
          thumbnail: {
            url: random.sticker()
          }
        }
      })
    })
    .catch((error) => {
      // Send an embed message with the error.
      common.sendExceptionMsg(msg, error)
    })
}

module.exports = {
  name: 'live',
  desc: 'Embeds a nice link for a Twitch stream. Channel must be live.',
  aliases: ['stream'],
  usage: 'live',
  run
}
