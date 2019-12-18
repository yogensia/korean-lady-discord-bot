const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !fine [sides]
 *
 * Fines someone with a random amount of money, in a random currency.
 */
exports.run = (client, msg, args) => {
  let subject = args.join(' ')
  subject     = subject.stripMention(subject, msg)

  // Random emote.
  const emotes_array = [
    ':receipt:',
    ':money_with_wings:',
    ':moneybag:'
  ]
  const emote = math.getRandomInt(0, emotes_array.length - 1)

  // Random currency.
  const currency_array = [
    'USD',
    'Euros',
    'Pounds',
    'Swiss Francs',
    'Japanese Yen',
    'Swedish Krona',
    'Hyrule Rupees',
    'Gold bars'
  ]
  const currency = math.getRandomInt(0, currency_array.length - 1)

  // Random money amount.
  let money = math.getRandomInt(0, 999888777666)
  // Randomly trim to make very low amounts more common.
  const trim = math.getRandomInt(0, 9)
  money = parseInt(money.toString().substring(trim), 10)
  // Round to two decimals and format number, ex: 12,345.67
  money = money / 100 // Get two decimals
  money = money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

  // Make sure a there is a subject, but don't let the Korean lady get finned.
  if ('' === subject) {
    msg.channel.send('Missing parameter: You must specify who you want to fine! :rage:\n Example: `!fine Twitch`')
  } else if ('koreanlady' === subject.toLowerCase() || 'korean lady' === subject.toLowerCase()) {
    msg.channel.send(`:rage: Trying to fine the Korean Lady is illegal! **${msg.author.username}** has been fined instead, with ${money} ${currency_array[currency]}!`)
  } else {
    msg.channel.send(`${emotes_array[emote]} ${msg.author.username} fined **${subject}** with ${money} ${currency_array[currency]}!`)
  }
}
