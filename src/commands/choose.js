const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  // Join all arguments and split by forward slashes instead.
  let choices = args.join(' ').split('/')

  // Make sure there are no options empty with several spaces.
  choices = choices.map((element) => {
    return element.trim()
  })

  // Get rid of empty choices if any are found.
  // This removes falsy elements from the array.
  choices = choices.filter(Boolean)

  // Check required parameters.
  if (choices.length < 2) {
    common.sendMissingParameterMsg(client, msg, 'You need two or more choices!')
  } else {
    // Choose randomly between choices given.
    const random = math.getRandomInt(0, choices.length - 1)

    // Random emote.
    const emotes = [
      ':bar_chart:',
      ':confetti_ball:',
      ':bulb:',
      ':scales:',
      ':fortune_cookie:'
    ]
    const emote = math.getRandomStringFromArray(emotes)

    // Random intro.
    const intros = [
      'The correct choice is',
      'The obvious choice is',
      'Well, obviously',
      'Maybe',
      'Gotta go with',
      'Ehh.. let\'s just say',
      'And the winner is...',
      'Ok, how about'
    ]
    const intro = math.getRandomStringFromArray(intros)

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
  args: true,
  args_error: 'You need two or more choices!',
  run
}
