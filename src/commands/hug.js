const common = require('../utils/common')
const math = require('../utils/math')
const random = require('../utils/random')

const run = (client, msg, args) => {
  // Get subject from args.
  const subject = common.stripMentions(args.join(' '), msg)

  // Ramdom emotes and hug duration.
  const emote_array = [
    'peepoPants',
    'peepoBlanket',
    'ihaa',
    'Hypers',
  ]
  const emote = common.getCustomEmote(client, math.getRandomStringFromArray(emote_array))
  const time  = math.getRandomFloat(0, 10)

  // Random exclamation.
  const exclamation = random.exclamation()

  // Send message.
  msg.channel.send(`${exclamation} ${msg.author.username} hugged **${subject}** for ${time.toFixed(2)} mississippis! ${emote}`)
}

module.exports = {
  name: 'hug',
  desc: 'Hugs someone/something for a random amount of mississippis.',
  usage: ['hug <subject>'],
  examples: ['hug chat'],
  args: true,
  args_error: 'You must specify who or what you want to hug!',
  run
}
