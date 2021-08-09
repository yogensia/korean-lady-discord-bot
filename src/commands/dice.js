const common = require('../utils/common')
const math = require('../utils/math')

const construct = (client, msg, args) => {
  // Check for arguments.
  let sides
  if (Array.isArray(args) && args.length) {
    // Try to parse number.
    sides = args[0].toString()
    sides = sides.replace(/[^\d.]/g, '')
    sides = parseInt(sides, 10)

    // If not a valid number, fallback to 6 sides.
    if (!Number.isInteger(sides)) {
      sides = 6
    }
  } else {
    // If no argument provided, default to 6 sides.
    sides = 6
  }

  // Throw the dice!
  const result = math.getRandomInt(1, sides)

  // Return message.
  return `🎲 ${common.displayName(msg)} threw a ${sides} sided dice... The result was **${result}**!`
}

const slash = (client, msg, interaction, args) => {
  // Reply with an embed message.
  common.interactionReply(interaction, construct(client, msg, args))
}

const run = (client, msg, args) => {
  // Reply with an embed message.
  common.sendEmbed(msg, construct(client, msg, args))
}

module.exports = {
  name: 'dice',
  desc: 'Throws a dice. By default it will be a 6 sided dice, but a different number can be added after the command.',
  usage: 'dice [sides]',
  examples: ['dice', 'dice 12'],
  slash_command: {
    description: 'Throws a dice, 6 sides by default',
    options: [
      {
        name: 'sides',
        value: 'sides',
        description: 'Number of sides',
        type: 4,
        required: false
      }
    ]
  },
  slash,
  run
}
