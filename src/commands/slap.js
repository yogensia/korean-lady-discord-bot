const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  // Get subject from args.
  const subject = common.stripMentions(args.join(' '), msg)

  // Get random HP.
  const result = math.getRandomInt(0, 110)

  // Random emote.
  const emotes = [
    ['sadcat', '👀'],
    ['PandaOhNo', '😱'],
    ['sweat_eo_medic', '😰'],
    ['PepeHands~1', '😭'],
    ['Monkas', '😦'],
    ['apollo20M2', '😔'],
    ['noCustomEmote', '👀']
  ]
  let emote = math.getRandomStringFromArray(emotes)
  emote = common.getCustomEmote(client, emote[0], emote[1])

  // Depending on percentage send a different message.
  if (result > 75) {
    msg.channel.send(`${emote} ${msg.author.username} slapped **${subject}**! It's super efective! That drained a total of **${result}HP**!`)
  } else if (result > 25) {
    msg.channel.send(`${emote} ${msg.author.username} slapped **${subject}**! That took a total of ${result}HP!`)
  } else {
    msg.channel.send(`${emote} ${msg.author.username} slapped **${subject}**! It's not very efective... That drained a total of **${result}HP**!`)
  }
}

module.exports = {
  name: 'slap',
  desc: 'Lets you slap your nemeses, and shows how much damage you\'ve inflicted.',
  usage: 'slap <subject>',
  examples: ['slap @Cthulhu', 'slap everyone in chat'],
  args: true,
  args_error: 'You must specify who is getting slapped!',
  run
}
