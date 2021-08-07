const common = require('../utils/common')
const math = require('../utils/math')
const reactions = require('../utils/reactions')
const time = require('../utils/time')

// Emotes.
const emotes = [
  '🔨',
  '😡',
  '⛔️',
  '🚫',
  '🚪'
]

const construct = (client, msg, args) => {
  // Get subject from args.
  let subject = common.stripMentions(args.join(' '), msg)

  // Random emotes.
  const emote = math.getRandomStringFromArray(emotes, false)

  // Get time data.
  const future = time.getRandomFuture('YYYY-MM-DD HH:mm:ss')
  const futureFormatted = time.format(future, 'YYYY-MM-DD HH:mm:ss', 'MMMM YYYY')
  const countdown = time.getCountdown(future, 'YYYY-MM-DD HH:mm:ss')
  const longerThanYear = time.longerThanYear(future, 'YYYY-MM-DD HH:mm:ss')

  // If no subject specified, default to "everyone" or similar string.
  if (!subject) {
    subject = common.randomSubject()
  }

  // Build message string.
  let message = `${emote} ${common.displayName(msg)} banned **${subject}** for ${countdown}!`
  if (longerThanYear) {
    message += ` See you in **${futureFormatted}!** 👋`
  }

  // Return data.
  return {
    message,
    subject
  }
}

const slash = async (client, msg, interaction, args) => {
  const data = await construct(client, msg, args)

  // Reply with an embed message.
  await interaction.reply({
    embeds: [{
      color: 0x2f3136,
      description: data.message
    }]
  })
}

const run = async (client, msg, args) => {
  const data = await construct(client, msg, args)

  // Reply with an embed message.
  msg.channel.send({
    embeds: [{
      color: 0x2f3136,
      description: data.message
    }]
  }).then(ownMessage => {
    // REEE... If subject is Korean Lady she will react with a random emote.
    if (common.koreanLadyMentioned(data.subject)) {
      reactions.reactSad(client, ownMessage, 2)
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'ban',
  desc: 'Bans a user or object for a random amount of time, from a few seconds to several years. If the ban is longer than a year the expiry date will also be shown.',
  usage: 'ban [subject]',
  examples: ['ban', 'ban Mosquitoes', 'ban @Batman'],
  slash_command: {
    description: 'Bans a user or object for a random amount of time',
    options: [
      {
        name: 'target',
        value: 'target',
        description: 'Who or what are you banning?',
        type: 3,
        required: false
      }
    ]
  },
  slash,
  run
}
