const common = require('../utils/common')
const math = require('../utils/math')
const reactions = require('../utils/reactions')
const time = require('../utils/time')

const run = (client, msg, args) => {
  // Get subject from args.
  const subject = common.stripMentions(args.join(' '), msg)

  // Random emotes.
  const emotes = [
    '🔨',
    '😡',
    '⛔️',
    '🚫',
    '🚪'
  ]
  const emote = math.getRandomStringFromArray(emotes)

  // Get time data.
  const future = time.getRandomFuture('YYYY-MM-DD HH:mm:ss')
  const futureFormatted = time.format(future, 'YYYY-MM-DD HH:mm:ss', 'MMMM YYYY')
  const countdown = time.getCountdown(future, 'YYYY-MM-DD HH:mm:ss')
  const longerThanYear = time.longerThanYear(future, 'YYYY-MM-DD HH:mm:ss')

  // Build message string.
  let message = `${emote} ${msg.author.username} banned **${subject}** for ${countdown}!`
  if (longerThanYear) {
    message += ` See you in **${futureFormatted}!** 👋`
  }

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: message
    }
  }).then(ownMessage => {
    // REEE... If subject is Korean Lady she will react with a random emote.
    if (common.koreanLadyMentioned(subject)) {
      reactions.reactSad(client, ownMessage, 2)
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
