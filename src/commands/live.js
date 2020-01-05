const common = require('../utils/common')
const twitch = require('../utils/twitch')
const random = require('../utils/random')

const run = (client, msg, args) => {
  // Request stream info from Twitch API.
  twitch.request('streams?user_login=apollolol')
    .then((stream) => {
      // Random data.
      const sticker = random.sticker()
      const exclamation = random.exclamation()

      // Send an embed message with the stream details.
      msg.channel.send({
        embed: {
          color: 3447003,
          title: stream.title,
          description: `**${exclamation} Apollo is going live!**`,
          url: `https://twitch.tv/${stream.user_name.toLowerCase()}`,
          thumbnail: {
            url: sticker,
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
  desc: 'Embed a nice link for a Twitch stream. Channel must be live.',
  aliases: ['stream'],
  usage: 'live',
  run
}
