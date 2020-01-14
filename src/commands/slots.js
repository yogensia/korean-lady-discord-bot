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
  const symbolsFormatted = `${result[0]} ${result[1]} ${result[2]}`

  // Compare values and send message.
  let message
  if (math.areEqual(result)) {
    // Random exclamation.
    const exclamation = random.exclamation()

    const emote = common.getCustomEmote(client, 'Hypers')
    message = `**${exclamation} You won!** ${emote}`
  } else {
    const emote = common.getCustomEmote(client, 'sadcat')
    message = `Sorry, no prize... ${emote}`
  }

  // Show results.
  msg.channel.send(symbolsFormatted)

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: message
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'slots',
  desc: 'Try your luck at the slot machines. There are 3 reels with 4 possible symbols, so you have a 1 in 63 chance to win!',
  aliases: ['slot', 'slotmachine'],
  usage: 'slots',
  run
}
