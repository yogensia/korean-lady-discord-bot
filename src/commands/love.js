const common = require('../utils/common')
const math = require('../utils/math')
const random = require('../utils/random')

const run = (client, msg, args) => {
  // Get subject from args.
  const subject = common.stripMentions(args.join(' '), msg)

  // Get random percentage.
  const result = math.getRandomInt(0, 110)

  // Depending on percentage send a different message.
  if (94 < result) {
    msg.channel.send(`:cupid: What!? ${msg.author.username} Love for **${subject}** is _**${result}%**_!`)
  } else if (69 < result) {
    msg.channel.send(`:heart_eyes: ${random.exclamation()} ${msg.author.username} love for **${subject}** is **${result}%**!`)
  } else if (49 < result) {
    msg.channel.send(`:thinking: ${msg.author.username} Love for **${subject}** is ${result}%.`)
  } else if (9 < result) {
    msg.channel.send(`:weary: ${random.exclamationNegative()} ${msg.author.username} love for **${subject}** is ${result}%.`)
  } else {
    msg.channel.send(`:neutral_face: ${random.exclamationNegative()} ${msg.author.username} love for **${subject}** is ${result}%.`)
  }
}

module.exports = {
  name: 'love',
  desc: 'Show how much you love someone or something, with a random percentage.',
  usage: ['love <subject>'],
  examples: ['love @Wumpus', 'love everyone in chat'],
  args: true,
  args_error: 'You must specify the subject of your love!',
  run
}
