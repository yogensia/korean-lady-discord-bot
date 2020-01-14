const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  // Get subject from args.
  const subject = common.stripMentions(args.join(' '), msg)

  // Random emote.
  const emotes = [
    '🧾',
    '💸',
    '💳',
    '💰'
  ]
  const emote = math.getRandomStringFromArray(emotes)

  // Random currency.
  const currencies = [
    'USD',
    'Euros',
    'Pounds',
    'Swiss Francs',
    'Japanese Yen',
    'Swedish Krona',
    'South Korean won',
    'Hyrule Rupees',
    'Gold coins',
    'Imperial credits',
    'Souls',
    'Zeni'
  ]
  const currency = math.getRandomStringFromArray(currencies)

  // Random money amount.
  let money = math.getRandomInt(0, 999888777666)

  // Randomly trim to make very low amounts more common.
  const trim = math.getRandomInt(0, 9)
  money = parseInt(money.toString().substring(trim), 10)

  // If less than `100`, round to two decimals, ex: 99.67 USD
  // Otherwise show a whole number, ex: 5,984,256 Hyrule Rupees.
  if (money < 10000) {
    money = (money / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else {
    money = (money / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })
  }

  // Don't let the Korean lady get finned!
  if (subject.toLowerCase() === 'koreanlady' || subject.toLowerCase() === 'korean lady') {
    const emoteAngry = common.getCustomEmote(client, 'Angry', '😡')
    // Reply with an embed message.
    msg.channel.send({
      embed: {
        color: 0x2f3136,
        description: `${emoteAngry} Trying to fine the Korean Lady is illegal!\n\n${emote} **${msg.author.username}** has been fined instead, with **${money} ${currency}!**`
      }
    }).catch(err => common.sendErrorMsg(msg, err))
  } else {
    // Reply with an embed message.
    msg.channel.send({
      embed: {
        color: 0x2f3136,
        description: `${emote} ${msg.author.username} has fined **${subject}** with **${money} ${currency}!**`
      }
    }).catch(err => common.sendErrorMsg(msg, err))
  }
}

module.exports = {
  name: 'fine',
  desc: 'Fines someone with a random amount of money, in a random currency.',
  usage: 'fine <subject>',
  examples: ['fine @Superman', 'fine The whole planet'],
  args: true,
  args_error: 'You must specify who you want to fine!',
  run
}
