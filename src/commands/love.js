const common = require('../utils/common')
const math = require('../utils/math')
const random = require('../utils/random')
const reactions = require('../utils/reactions')

const run = (client, msg, args) => {
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

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: message
    }
  }).then(ownMessage => {
    // IHAA... If subject is Korean Lady she will react with a random emote.
    if (common.koreanLadyMentioned(subject)) {
      if (result > 69) {
        reactions.reactHappy(client, ownMessage, 3)
      } else if (result < 30) {
        reactions.reactSad(client, ownMessage, 1)
      }
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'love',
  desc: 'Shows how much you love someone or something, with a random percentage.',
  usage: 'love [subject]',
  examples: ['love', 'love @Wumpus', 'love everyone in chat'],
  run
}
