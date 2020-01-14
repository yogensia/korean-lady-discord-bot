const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  // Get subject from args.
  const subject = common.stripMentions(args.join(' '), msg)

  // Max equals 10 years.
  const time = math.toFakeTimeString(math.getRandomInt(0, 631139040))
  const emotes = [
    '🔨',
    '😡',
    '⛔️',
    '🚫',
    '🚪'
  ]
  const emote = math.getRandomStringFromArray(emotes)

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: `${emote} ${msg.author.username} banned **${subject}** for ${time}`
    }
  }).then(ownMessage => {
    // REEE... Are we banning Korean Lady??
    if (subject.toLowerCase() === 'koreanlady' || subject.toLowerCase() === 'korean lady') {
      // Just wait a moment...
      setTimeout(() => {
        common.reactWithCustomEmote(client, ownMessage, 'Angry', '😡')
      }, 1500)
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'ban',
  desc: 'Bans a user or object for a random amount of time, from a few seconds to several years. If the ban is longer than a year the expiry date will also be shown.',
  usage: 'ban <subject>',
  examples: ['ban Mosquitoes', 'ban @Batman'],
  args: true,
  args_error: 'You must specify who or what to ban!',
  run
}
