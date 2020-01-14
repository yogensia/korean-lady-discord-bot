const common = require('../utils/common')
const random = require('../utils/random')

const run = (client, msg, args) => {
  // Get random sticker.
  const sticker = random.sticker()

  msg.channel.send('', {
    file: sticker
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'sticker',
  desc: 'Replies with a random Apollo emote sticker.',
  aliases: ['emote'],
  usage: 'sticker',
  run
}
