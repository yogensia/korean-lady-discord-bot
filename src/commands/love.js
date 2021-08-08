const common = require('../utils/common')
const math = require('../utils/math')
const random = require('../utils/random')

const construct = (client, msg, args) => {
  // Get subject from args.
  let subject = common.stripMentions(args.join(' '), msg)

  // Get random percentage.
  const result = math.getRandomInt(0, 110)

  // If no subject specified, default to "everyone" or similar string.
  if (!subject) {
    subject = common.randomSubject()
  }

  // Depending on percentage send a different message.
  let message
  if (result > 94) {
    message = `💘 What!? ${common.displayName(msg)}'s love for **${subject}** is _**${result}%**_!`
  } else if (result > 69) {
    message = `😍 ${random.exclamation()} ${common.displayName(msg)}'s love for **${subject}** is **${result}%**!`
  } else if (result > 49) {
    message = `🤔 ${common.displayName(msg)}'s love for **${subject}** is ${result}%.`
  } else if (result > 9) {
    message = `😩 ${random.exclamationNegative()} ${common.displayName(msg)}'s love for **${subject}** is ${result}%.`
  } else {
    message = `😐 ${random.exclamationNegative()} ${common.displayName(msg)}'s love for **${subject}** is ${result}%.`
  }

  // Return message.
  return message
}

const slash = async (client, msg, interaction, args) => {
  // Reply with an embed message.
  await interaction.reply({
    embeds: [{
      color: 0x2f3136,
      description: construct(client, msg, args)
    }]
  })
}

const run = (client, msg, args) => {
  // Reply with an embed message.
  common.sendEmbed(msg, construct(client, msg, args))
}

module.exports = {
  name: 'love',
  desc: 'Shows how much you love someone or something, with a random percentage.',
  usage: 'love [subject]',
  examples: ['love', 'love @Wumpus', 'love everyone in chat'],
  slash_command: {
    description: 'Shows how much you love someone or something',
    options: [
      {
        name: 'target',
        value: 'target',
        description: 'Who are you going to show your love to?',
        type: 3,
        required: false
      }
    ]
  },
  slash,
  run
}
