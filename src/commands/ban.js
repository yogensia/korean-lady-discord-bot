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

  // Make sure a there is a subject.
  if ('' === subject) {
    common.sendMissingParameterMsg(client, msg, 'You must specify who or what to ban!', 'ban Mosquitoes')
  } else {
    subject = subject.stripMentions(subject, msg)

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
      // Random reee.
      const reee_array = [
        'WHAT!?!',
        'HUH!?!',
        'WAIT WHAT!?!',
        'REEEEEEE',
        'NEEEEJ',
        'HEY!!!'
      ]
      const reee = math.getRandomStringFromArray(reee_array)
      const emote_angry = common.getCustomEmote(client, 'Angry', 'rage')

      // For added suspense.
      msg.channel.startTyping()

      // Just wait a moment...
      setTimeout(function() {
        msg.channel.send(`_**${reee}**_`)
        msg.channel.send(`${emote_angry}`)
        msg.channel.stopTyping()
      }, 1500)
    }
  }
}
