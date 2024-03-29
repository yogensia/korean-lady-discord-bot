const common = require('../utils/common')
const math = require('../utils/math')

// Emotes.
const emotes = [
  ['sadcat', '👀'],
  ['PandaOhNo', '😱'],
  ['sweat_eo_medic', '😰'],
  ['PepeHands~1', '😭'],
  ['Monkas', '😦'],
  ['apollo20M2', '😔'],
  ['noCustomEmote', '👀']
]

const construct = (client, msg, args) => {
  // Get subject from args.
  let subject = common.stripMentions(args.join(' '), msg)

  // Get random HP.
  const result = math.getRandomInt(0, 100)
  let emote = math.getRandomStringFromArray(emotes, false)

  // Random emote.
  emote = common.getCustomEmote(client, emote[0], emote[1])

  // If no subject specified, default to "everyone" or similar string.
  if (!subject) {
    subject = common.randomSubject()
  }

  // Depending on percentage send a different message.
  let message
  if (result > 75) {
    message = `${emote} ${common.displayName(msg)} slapped **${subject}**! It's super efective! That drained a total of **${result} HP**!`
  } else if (result > 25) {
    message = `${emote} ${common.displayName(msg)} slapped **${subject}**! That drained a total of **${result} HP**!`
  } else {
    message = `${emote} ${common.displayName(msg)} slapped **${subject}**! It's not very efective... That drained a total of **${result} HP**!`
  }

  // Return message.
  return message
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
  name: 'slap',
  desc: 'Lets you slap your nemeses, and shows how much damage you\'ve inflicted.',
  usage: 'slap [subject]',
  examples: ['slap', 'slap @Cthulhu', 'slap everyone in chat'],
  slash_command: {
    description: 'Lets you slap your someone or something',
    options: [
      {
        name: 'target',
        value: 'target',
        description: 'Who are you going to slap?',
        type: 3,
        required: false
      }
    ]
  },
  slash,
  run
}
