const common = require('../utils/common')
const math = require('../utils/math')
const reactions = require('../utils/reactions')

const run = (client, msg, args) => {
  // Get subject from args.
  let subject = common.stripMentions(args.join(' '), msg)

  // Get random HP.
  const result = math.getRandomInt(0, 100)

  // Random emote.
  const emotes = [
    ['sadcat', '👀'],
    ['PandaOhNo', '😱'],
    ['sweat_eo_medic', '😰'],
    ['PepeHands~1', '😭'],
    ['Monkas', '😦'],
    ['apollo20M2', '😔'],
    ['noCustomEmote', '👀']
  ]
  let emote = math.getRandomStringFromArray(emotes)
  emote = common.getCustomEmote(client, emote[0], emote[1])

  // If no subject specified, default to "everyone" or similar string.
  if (!subject) {
    subject = common.randomSubject()
  }

  // Depending on percentage send a different message.
  let message
  if (result > 75) {
    message = `${emote} ${common.displayName(msg)} slapped **${subject}**! It's super efective! That drained a total of **${result}HP**!`
  } else if (result > 25) {
    message = `${emote} ${common.displayName(msg)} slapped **${subject}**! That drained a total of ${result}HP!`
  } else {
    message = `${emote} ${common.displayName(msg)} slapped **${subject}**! It's not very efective... That drained a total of **${result}HP**!`
  }

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: message
    }
  }).then(ownMessage => {
    // REEE... If subject is Korean Lady she will react with a random emote.
    if (common.koreanLadyMentioned(subject)) {
      reactions.reactSad(client, ownMessage, 2)
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'slap',
  desc: 'Lets you slap your nemeses, and shows how much damage you\'ve inflicted.',
  usage: 'slap [subject]',
  examples: ['slap', 'slap @Cthulhu', 'slap everyone in chat'],
  run
}
