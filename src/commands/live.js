const common = require('../utils/common')
const random = require('../utils/random')
const twitch = require('../utils/twitch')

const run = (client, msg, args) => {
  // Guild owner only command.
  if (msg.guild.ownerID === msg.author.id) {
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
  } else {
    common.sendErrorMsg(msg, `Sorry, only the server owner can use this command.`)
  }
}

module.exports = {
  name: 'live',
  desc: 'Embed a nice link for a Twitch stream. Channel must be live.',
  aliases: ['stream'],
  usage: 'live',
  run
}
