const math = require('../utils/math')

/**
 * COMMAND: !rate <subject>
 *
 * Description: Rate someone/something randomly from 0 to 10.
 */
exports.run = (client, msg, args) => {
  let subject = args.join(' ')
  const rating = math.getRandomInt(0, 10)

  // Remove user mentions, experimental.
  if (subject.startsWith('<@')) {
    // Get username of first mention (ignore the rest if more than one).
    for (var [key, value] of msg.mentions.users) {
      subject = value.username
      break
    }
  }

  // Random intro emote.
  const emotes_array = [
    ':bar_chart:',
    ':chart_with_upwards_trend:',
    ':chart_with_downwards_trend:',
    ':woman_scientist:',
    ':man_scientist:',
    ':test_tube:',
    ':microscope:'
  ]
  const emote = math.getRandomInt(0, emotes_array.length - 1)

  // Make sure a question was asked.
  if ('' === subject) {
    msg.channel.send('Missing parameter: You must specify who or what to rate! :rage:\nExample: `!rate Vanilla Pudding`')
  } else {
    msg.channel.send(`${emotes_array[emote]} Based on extensive research, **${subject}** gets a rating of **${rating}/10**!`)
  }
}