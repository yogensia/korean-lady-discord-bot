const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  let choices = args.join(' ')
  choices = choices.split('/')

  // Check required parameters.
  if (2 > choices.length) {
    common.sendMissingParameterMsg(client, msg, 'You need two or more choices!')
  } else {
    // Choose randomly between choices given.
    const random = math.getRandomInt(0, choices.length -1)

    // Random emote.
    const emote_array = [
      ':bar_chart:',
      ':confetti_ball:',
      ':bulb:',
      ':scales:',
      ':fortune_cookie:'
    ]
    const emote = math.getRandomStringFromArray(emote_array)

    // Random intro.
    const intro_array = [
      'The correct choice is',
      'The obvious choice is',
      'Well, obviously',
      'Maybe',
      'Gotta go with',
      'Ehh.. let\'s just say',
      'And the winner is...',
      'Ok, how about'
    ]
    const intro = math.getRandomStringFromArray(intro_array)

    // Send message.
    msg.channel.send(`${emote} ${intro} **${choices[random].trim()}**!`)
  }
}

module.exports = {
  name: 'choose',
  desc: 'Helps you choose between two or more options. Options must be separated by a forward slash.',
  aliases: ['choice'],
  usage: ['choose <option 1/option 2/...>'],
  examples: ['choose The Doors/David Bowie/Queen'],
  run
}
