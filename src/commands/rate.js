const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !rate <subject>
 *
 * Description: Rate someone/something randomly from 0 to 10.
 */
exports.run = (client, msg, args) => {
  let subject = args.join(' ')

  // Make sure a question was asked.
  if ('' === subject) {
    common.sendMissingParameterMsg(client, msg, 'You must specify who or what to rate!', 'rate Vanilla Pudding')
  } else {
    // Get random rating value.
    const rating = math.getRandomInt(0, 11)

    // Remove user mentions, experimental.
    if (subject.startsWith('<@')) {
      // Get username of first mention (ignore the rest if more than one).
      for (var [key, value] of msg.mentions.users) {
        subject = value.username
        break
      }
    }

    // Random intro emote.
    const emote_array = [
      ':bar_chart:',
      ':chart_with_upwards_trend:',
      ':chart_with_downwards_trend:',
      ':woman_scientist:',
      ':man_scientist:',
      ':test_tube:',
      ':microscope:'
    ]
    const emote = math.getRandomStringFromArray(emote_array)

    // Send message.
    msg.channel.send(`${emote} Based on extensive research, **${subject}** gets a rating of **${rating}/10**!`)
  }
}
