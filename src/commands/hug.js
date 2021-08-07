const common = require('../utils/common')
const math = require('../utils/math')
const random = require('../utils/random')

// Emotes.
const emotes = [
  'peepoPants',
  'peepoBlanket',
  'ihaa',
  'Hypers'
]

const construct = (client, msg, args) => {
  // Get subject from args.
  let subject = common.stripMentions(args.join(' '), msg)

  // Ramdom emotes and hug duration.
  const emote = common.getCustomEmote(client, math.getRandomStringFromArray(emotes, false))
  const time = math.getRandomFloat(0, 10)

  // Random exclamation.
  const exclamation = random.exclamation()

  // If no subject specified, default to "everyone" or similar string.
  if (!subject) {
    subject = common.randomSubject()
  }

  // Return message.
  return `${exclamation} ${common.displayName(msg)} hugged **${subject}** for ${time.toFixed(2)} mississippis! ${emote}`
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
  name: 'hug',
  desc: 'Hugs someonefor a random amount of mississippis.',
  usage: 'hug [subject]',
  examples: ['hug', 'hug chat'],
  slash_command: {
    description: 'Hugs someone for a random amount of mississippis',
    options: [
      {
        name: 'target',
        value: 'target',
        description: 'Who or what are you going to hug?',
        type: 3,
        required: false
      }
    ]
  },
  slash,
  run
}
