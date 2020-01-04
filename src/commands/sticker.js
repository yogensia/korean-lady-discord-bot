const random = require('../utils/random')

const run = (client, msg, args) => {
  const sticker = random.sticker()
  msg.channel.send('', {
    file: sticker
  })
}

module.exports = {
  name: 'sticker',
  desc: 'Replies with a random Apollo emote sticker.',
  aliases: ['emote'],
  usage: 'sticker',
  run
}


