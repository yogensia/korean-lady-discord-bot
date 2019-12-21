const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !hug <subject>
 *
 * Description: Hugs someone/something for a random amount of mississippis.
 */
exports.run = (client, msg, args) => {
  let subject = args.join(' ')
  // Remove user mentions, experimental.
  if (subject.startsWith('<@')) {
    // Get username of first mention (ignore the rest if more than one).
    for (var [key, value] of msg.mentions.users) {
      subject = value.username
      break
    }
  }

  // Make sure subject isn't empty.
  if ('' === subject) {
    common.sendMissingParameterMsg(client, msg, 'You must specify who you want to hug!', 'hug chat')
  } else {
    // Ramdom emotes and hug length.
    const emote_array = [
      ':bar_chart:',
      ':chart_with_upwards_trend:',
      ':chart_with_downwards_trend:'
    ]
    const emote = math.getRandomStringFromArray(emote_array)
    const time  = math.getRandomFloat(0, 10)

    // Send message.
    msg.channel.send(`${emote} ${msg.author.username} hugs **${subject}** for ${time.toFixed(2)} mississippis!`)
  }
}
