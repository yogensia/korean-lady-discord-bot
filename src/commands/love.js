const common = require('../utils/common')
const math = require('../utils/math')
const random = require('../utils/random')

const run = (client, msg, args) => {
  // Get subject from args.
  const subject = common.stripMentions(args.join(' '), msg)

  // Get random percentage.
  const result = math.getRandomInt(0, 110)

  // Depending on percentage send a different message.
  let message
  if (result > 94) {
    message = `💘 What!? ${msg.author.username}'s love for **${subject}** is _**${result}%**_!`
  } else if (result > 69) {
    message = `😍 ${random.exclamation()} ${msg.author.username}'s love for **${subject}** is **${result}%**!`
  } else if (result > 49) {
    message = `🤔 ${msg.author.username}'s love for **${subject}** is ${result}%.`
  } else if (result > 9) {
    message = `😩 ${random.exclamationNegative()} ${msg.author.username}'s love for **${subject}** is ${result}%.`
  } else {
    message = `😐 ${random.exclamationNegative()} ${msg.author.username}'s love for **${subject}** is ${result}%.`
  }

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: message
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'love',
  desc: 'Shows how much you love someone or something, with a random percentage.',
  usage: 'love <subject>',
  examples: ['love @Wumpus', 'love everyone in chat'],
  args: true,
  args_error: 'You must specify the subject of your love!',
  run
}
