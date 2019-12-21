const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !love <subject>
 *
 * Show how much you love someone or something, with a random percentage.
 */
exports.run = (client, msg, args) => {
  let subject = args.join(' ')
  subject     = subject.stripMention(subject, msg)

  // Check required parameters.
  if ('' === subject) {
    common.sendMissingParameterMsg(client, msg, 'You didn\'t specify the subject of your love!', 'love Fish & Chips')
  } else {
    // Get random percentage.
    const result = math.getRandomInt(0, 110)

    // Depending on percentage send a different message.
    if (94 < result) {
      msg.channel.send(`:cupid: What!? ${msg.author.username} Love for **${subject}** is _**${result}%**_!`)
    } else if (69 < result) {
      msg.channel.send(`:heart_eyes: Wow! ${msg.author.username} love for **${subject}** is **${result}%**!`)
    } else if (49 < result) {
      msg.channel.send(`:thinking: ${msg.author.username} Love for **${subject}** is ${result}%.`)
    } else if (9 < result) {
      msg.channel.send(`:weary: Oh... ${msg.author.username} love for **${subject}** is ${result}%.`)
    } else {
      msg.channel.send(`:neutral_face: Oh, wow... ${msg.author.username} love for **${subject}** is ${result}%.`)
    }
  }
}
