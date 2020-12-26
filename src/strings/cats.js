const common = require('../utils/common')
const math = require('../utils/math')

// Emotes.
const emotes = [
  'blelele',
  'Angry',
  'Apoggies',
  'babyrage',
  'blurryeyes',
  'drakeban',
  'FeelsGunMan',
  'Monkas',
  'JigglypufOhGod',
  'PandaOhNo',
  'PepeHands'
]

const run = (client, msg) => {
  // Ramdom emote.
  const emote = common.getCustomEmote(client, math.getRandomStringFromArray(emotes, false))

  const sentence = 'no cats!'

  const description = `${sentence} ${emote}`

  // Reply with an embed message.
  msg.channel.send(description).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'cats',
  desc: 'Reply with "no cats!" when someone mentions Cats',
  run
}
