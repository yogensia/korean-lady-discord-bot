const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !fine [sides]
 *
 * Fines someone with a random amount of money, in a random currency.
 */
exports.run = (client, msg, args) => {
  let subject = args.join(' ')
  subject     = subject.stripMentions(subject, msg)

  // Make sure a there is a subject.
  if ('' === subject) {
    common.sendMissingParameterMsg(client, msg, 'You must specify who you want to fine!', 'fine Twitch')
  } else {
    // Random emote.
    const emote_array = [
      ':receipt:',
      ':money_with_wings:',
      ':moneybag:'
    ]
    const emote = math.getRandomStringFromArray(emote_array)

    // Random currency.
    const currency_array = [
      'USD',
      'Euros',
      'Pounds',
      'Swiss Francs',
      'Japanese Yen',
      'Swedish Krona',
      'South Korean won',
      'Hyrule Rupees',
      'Gold bars'
    ]
    const currency = math.getRandomStringFromArray(currency_array)

    // Random money amount.
    let money = math.getRandomInt(0, 999888777666)
    // Randomly trim to make very low amounts more common.
    const trim = math.getRandomInt(0, 9)
    money = parseInt(money.toString().substring(trim), 10)
    // Round to two decimals and format number, ex: 12,345.67
    money = money / 100 // Get two decimals
    money = money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

    // Don't let the Korean lady get finned!
    if ('koreanlady' === subject.toLowerCase() || 'korean lady' === subject.toLowerCase()) {
      let emote_angry = common.getCustomEmote(client, 'Angry', 'rage')
      msg.channel.send(`${emote_angry} Trying to fine the Korean Lady is illegal! **${msg.author.username}** has been fined instead, with ${money} ${currency}!`)
    } else {
      msg.channel.send(`${emote} ${msg.author.username} has fined **${subject}** with ${money} ${currency}!`)
    }
  }
}
