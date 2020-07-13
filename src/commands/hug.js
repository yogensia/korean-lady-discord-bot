const common = require('../utils/common')
const math = require('../utils/math')
const random = require('../utils/random')
const reactions = require('../utils/reactions')

// Emotes.
const emotes = [
  'peepoPants',
  'peepoBlanket',
  'ihaa',
  'Hypers'
]

const run = (client, msg, args) => {
  // Get subject from args.
  let subject = common.stripMentions(args.join(' '), msg)

  // Ramdom emotes and hug duration.
  const emote = common.getCustomEmote(client, math.getRandomStringFromArray(emotes))
  const time = math.getRandomFloat(0, 10)

  // Random exclamation.
  const exclamation = random.exclamation()

  // If no subject specified, default to "everyone" or similar string.
  if (!subject) {
    subject = common.randomSubject()
  }

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: `${exclamation} ${common.displayName(msg)} hugged **${subject}** for ${time.toFixed(2)} mississippis! ${emote}`
    }
  }).then(ownMessage => {
    // IHAA... If subject is Korean Lady she will react with a random emote.
    if (common.koreanLadyMentioned(subject)) {
      reactions.reactHappy(client, ownMessage, 3)
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'hug',
  desc: 'Hugs someone/something for a random amount of mississippis.',
  usage: 'hug [subject]',
  examples: ['hug', 'hug chat'],
  run
}
