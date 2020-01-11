const common = require('../utils/common')
const math = require('../utils/math')
const random = require('../utils/random')

const run = (client, msg, args) => {
  // Random symbols.
  const symbols = [
    '🍒',
    '🍉',
    '🍍',
    '🥦'
  ]

  const result = [
    math.getRandomStringFromArray(symbols),
    math.getRandomStringFromArray(symbols),
    math.getRandomStringFromArray(symbols)
  ]
  const symbolsFormatted = `:${result[0]}: :${result[1]}: :${result[2]}:`

  // Compare values and send message.
  if (math.areEqual(result)) {
    // Random exclamation.
    const exclamation = random.exclamation()

    const emote = common.getCustomEmote(client, 'Hypers')
    msg.channel.send(symbolsFormatted)
    msg.channel.send(`>>> **${exclamation} You won!** ${emote}`)
  } else {
    const emote = common.getCustomEmote(client, 'sadcat')
    msg.channel.send(symbolsFormatted)
    msg.channel.send(`>>> Sorry, no prize... ${emote}`)
  }
}

module.exports = {
  name: 'slots',
  desc: 'Try your luck at the slot machines. There are 3 reels with 4 possible symbols, so you have a 1 in 63 chance to win!',
  aliases: ['slot', 'slotmachine'],
  usage: 'slots',
  run
}
