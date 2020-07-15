const common = require('../utils/common')
const math = require('../utils/math')

// Emotes.
const emotes = [
  'apololw',
  'Angry',
  'Apoggies',
  'liduHyper',
  'pikaD',
  'POG',
  'blurryeyes',
  'tohrusmug'
]

const randomSentenceArray = [
  'pum stirm when',
  'pum strim wehn',
  'pum jshkd wgeke?',
  'pumski strimski when?',
  'pum når er strim?',
  'strim pum when?',
  'pümli strümli when?'
]

const run = (client, msg) => {
  // Ramdom emotes and hug duration.
  const emote = common.getCustomEmote(client, math.getRandomStringFromArray(emotes, false))

  let sentence = 'pum strim when?'

  // Random rare sentence (chance one out of five).
  if (math.getRandomInt(1, 5) === 5) {
    sentence = math.getRandomStringFromArray(randomSentenceArray, false)
  }

  const description = `**${sentence}** ${emote}`

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'pum',
  desc: 'Reply with a "pum strim when?" when someone mentions Pum',
  run
}
