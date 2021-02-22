const common = require('../utils/common')
const math = require('../utils/math')
const random = require('../utils/random')

// Treats.
const emotes = [
  // ['kek', 'sadkek', 'gonBleh', 'minglee', 'LULW', 'concern'],
  ['pridePog', 'sadcat', 'tohrusmug', 'sweat_eo_medic', 'apololw', 'MingLee', 'LULW'],
  ['coolCat', 'catWow', 'catBread', 'catStare', 'kitty', 'cat', 'michael', 'catcry'],
  ['pugPls', 'catJAM', 'dogJAM', 'ratJAM', 'apolJAM', 'concernPls'],
  ['tohrusmug', 'huh', 'Angry', 'MingLee', 'liduHyper'],
  ['pepeLaugh', 'monkaHmm', 'concernFroge', 'pepeHandsUp', 'POG', 'concern']
  // ['apolPants~1', 'peepoWalk'],
  // ['babyrage', 'Blobfish'],
  // ['Apoggies', 'Hypers'],
  // ['partyturtle', 'partyturtle2'],
]

const buildEmoteString = (client) => {

  // Get a random set of emotes.
  const emote = math.getRandomStringFromArray(emotes, false)
  const goodEmoteIndex = math.getRandomInt(0, emote.length - 1)
  const goodEmote = emote[goodEmoteIndex]

  // Remove alredy selected emote from array.
  emote.splice(goodEmoteIndex, 1)
  const badEmoteIndex = math.getRandomInt(0, emote.length - 1)
  const badEmote = emote[badEmoteIndex]

  // Low chance of winning, 100% not rigged.
  const win = math.getRandomInt(1, 15) === 10

  const emoteArray = []
  if (win) {
    emoteArray.push(
      goodEmote,
      goodEmote,
      goodEmote
    )
  } else {
    emoteArray.push(
      goodEmote,
      goodEmote,
      badEmote
    )
  }

  // Shuffle array to randomize position of bad emote.
  random.shuffleArray(emoteArray)

  // Build string.
  let output = ''
  console.log({ win })
  emoteArray.forEach(emote => {
    console.log({ emote })
    output += `||${common.getCustomEmote(client, emote)}||`
  })

  return output
}

const run = (client, msg, args) => {
  // Reply with an embed message.
  msg.channel.send(buildEmoteString(client))
}

module.exports = {
  name: 'scratch',
  desc: 'Try your luck with a Scratch & Win ticket. Definitely not a scam...',
  usage: 'scratch',
  run
}
