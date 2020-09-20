const common = require('../utils/common')
const math = require('../utils/math')

// Emotes.
const emotes = [
  'apololw',
  'Angry',
  'Apoggies',
  'babyrage',
  'blurryeyes',
  'liduHyper',
  'MingLee',
  'pikaD',
  'POG',
  'tohrusmug'
]

const randomSentenceArray = [
  'lidu stirm when',
  'lidu strim wehn',
  'lidu jshkd wgeke?',
  'liduski strimuski when?',
  'lidu når er strim?',
  'strim lidu when?',
  'lidüli strimüli when?'
]

const run = (client, msg) => {
  // Ramdom emote.
  const emote = common.getCustomEmote(client, math.getRandomStringFromArray(emotes, false))

  let sentence = 'lidu strim when?'

  // Random rare sentence (chance one out of five).
  if (math.getRandomInt(1, 5) === 5) {
    sentence = math.getRandomStringFromArray(randomSentenceArray, false)
  }

  const description = `${sentence} ${emote}`

  // Reply with an embed message.
  msg.channel.send(description).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'lidu',
  desc: 'Reply with a "lidu strim when?" when someone mentions Lidu',
  run
}
