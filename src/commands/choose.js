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
    const choice = math.getRandomStringFromArray(choices)

    // Random emote.
    const emotes = [
      '📊',
      '🎊',
      '💡',
      '⚖️',
      '🥠'
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

    // Reply with an embed message.
    msg.channel.send({
      embed: {
        color: 0x2f3136,
        description: `${emote} ${intro} **${choice}**!`
      }
    }).catch(err => common.sendErrorMsg(msg, err))
  }
}

module.exports = {
  name: 'choose',
  desc: 'Helps you choose between two or more options. Options must be separated by a forward slash.',
  aliases: ['choice'],
  usage: 'choose <option 1/option 2/...>',
  examples: ['choose The Doors/David Bowie/Queen'],
  args: true,
  args_error: 'You need two or more choices!',
  run
}
