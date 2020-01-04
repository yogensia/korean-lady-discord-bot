const twitch = require('../utils/twitch')
const random = require('../utils/random')

const run = (client, msg, args) => {
  // Get data for the stream.
  twitch.getStream('talesoflumin', (error, stream) => {
    if (error) {
      // Send an embed message with the error.
      msg.channel.send({
        embed: {
          fields: [{
            name: 'Unexpected response from Twitch API:',
            value: error,
          }]
        }
      })
    } else {
      twitch.getGame(stream.game_id, (error, game) => {
        if (error) {
          // Send an embed message with the error.
          msg.channel.send({
            embed: {
              fields: [{
                name: 'Unexpected response from Twitch API:',
                value: error,
              }]
            }
          })
        } else {
          // console.log('Stream:', stream)
          // console.log('Game:', game)

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
              },
              // image: {
              //   url: game.box_art_url.replace('{width}', '300').replace('{height}', '400'),
              // },
              // fields: [{
              //   name: 'Playing...',
              //   value: game.name,
              // }]
            }
          })
        }
      })
    }
  })
}

module.exports = {
  name: 'live',
  desc: 'Embed a nice link for a Twitch stream. Channel must be live.',
  aliases: ['stream'],
  usage: 'live',
  run
}
