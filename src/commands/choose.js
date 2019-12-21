const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !choose <option 1/option 2/...>
 *
 * Helps you choose between two or more options. Options must be separated by a forward slash.
 */
exports.run = (client, msg, args) => {
  let choices = args.join(' ')
  choices = choices.split('/')

  // Check required parameters.
  if (2 > choices.length) {
    common.sendMissingParameterMsg(client, msg, 'You need two or more choices!', 'choose The Doors/David Bowie/Queen')
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
    const emote = math.getRandomInt(0, emote_array.length - 1)

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
    const intro = math.getRandomInt(0, intro_array.length - 1)

    // Send message.
    msg.channel.send(`${emote_array[emote]} ${intro_array[intro]} **${choices[random].trim()}**!`)
  }
}
