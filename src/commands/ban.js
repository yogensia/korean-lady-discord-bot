const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !ban <subject>
 *
 * Bans a user or object for a random amount of time, from a few seconds to several years.
 * If the ban is longer than a year the expiry date will also be shown.
 */
exports.run = (client, msg, args) => {
  let subject = args.join(' ')
  subject     = subject.stripMention(subject, msg)

  // Max equals 10 years.
  const time = math.getRandomInt(0, 631139040).toFakeTimeString()
  const emotes_array = [
    ':hammer:',
    ':rage:',
    ':no_entry:',
    ':no_entry_sign:',
    ':door:'
  ]
  const emote = math.getRandomInt(0, emotes_array.length - 1)

  // Make sure a there is a subject.
  if ('' === subject) {
    msg.channel.send('Missing parameter: You must specify who or what to ban! :rage:\n Example: `!ban Mosquitoes`')
  } else {
    msg.channel.send(`${emotes_array[emote]} ${msg.author.username} banned **${subject}** for ${time}`)
  }
}
