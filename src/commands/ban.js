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
    subject = subject.stripMention(subject, msg)

    // Max equals 10 years.
    const time = math.getRandomInt(0, 631139040).toFakeTimeString()
    const emote_angry = common.showEmote('Angry', client)
    const emotes_array = [
      ':hammer:',
      ':rage:',
      ':no_entry:',
      ':no_entry_sign:',
      ':door:'
    ]
    const emote = math.getRandomInt(0, emotes_array.length - 1)

    // Send message.
    msg.channel.send(`${emotes_array[emote]} ${msg.author.username} banned **${subject}** for ${time}`)

    // REEE...
    if ('koreanlady' === subject.toLowerCase() || 'korean lady' === subject.toLowerCase()) {
      // Random reee.
      const reee_array = [
        'WHAT!?!',
        'HUH!?!',
        'WAIT WHAT!?!',
        'REEEEEEE',
        'HEY!!!'
      ]
      const reee = math.getRandomInt(0, reee_array.length - 1)

      // For added suspense.
      msg.channel.startTyping()

      // Just wait a moment...
      setTimeout(function() {
        msg.channel.send(`_**${reee_array[reee]}**_`)
        msg.channel.send(`${emote_angry}`)
        msg.channel.stopTyping()
      }, 1500)
    }
  }
}
