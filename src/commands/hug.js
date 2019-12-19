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

  // Ramdom emotes and hug length.
  const emotes_array = [
    ':bar_chart:',
    ':chart_with_upwards_trend:',
    ':chart_with_downwards_trend:'
  ]
  const emote = math.getRandomInt(0, emotes_array.length - 1)
  const time  = math.getRandomFloat(0, 10)

  // Make sure subject isn't empty.
  if ('' === subject) {
    msg.channel.send('Missing parameter: You must specify who you want to hug! :rage:\n Example: `!hug chat`')
  } else {
    msg.channel.send(`${emotes_array[emote]} ${msg.author.username} hugs **${subject}** for ${time.toFixed(2)} mississippis!`)
  }
}