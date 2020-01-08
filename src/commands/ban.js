const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  // Get subject from args.
  const subject = common.stripMentions(args.join(' '), msg)

  // Max equals 10 years.
  const time = math.getRandomInt(0, 631139040).toFakeTimeString()
  const emote_array = [
    ':hammer:',
    ':rage:',
    ':no_entry:',
    ':no_entry_sign:',
    ':door:'
  ]
  const emote = math.getRandomStringFromArray(emote_array)

  // Send message.
  msg.channel.send(`${emote} ${msg.author.username} banned **${subject}** for ${time}`)

  // REEE...
  if ('koreanlady' === subject.toLowerCase() || 'korean lady' === subject.toLowerCase()) {
    // Just wait a moment...
    setTimeout(function() {
      common.reactWithCustomEmote(client, msg, 'Angry', '😡')
    }, 1500)
  }
}

module.exports = {
  name: 'ban',
  desc: 'Bans a user or object for a random amount of time, from a few seconds to several years. If the ban is longer than a year the expiry date will also be shown.',
  usage: ['ban <subject>'],
  examples: ['ban Mosquitoes', 'ban @Batman'],
  args: true,
  args_error: 'You must specify who or what to ban!',
  run
}
