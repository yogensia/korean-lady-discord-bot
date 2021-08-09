const common = require('../utils/common')
const math = require('../utils/math')

const construct = (client, msg, args) => {
  // Get random coin toss.
  const result = math.getRandomInt(0, 1)

  let message
  if (result === 1) {
    message = `🪙 ${common.displayName(msg)} threw a coin... The result was **Heads**!`
  } else {
    message = `🪙 ${common.displayName(msg)} threw a coin... The result was **Tails**!`
  }

  // Return message.
  return message
}

const slash = (client, msg, interaction, args) => {
  // Reply with an embed message.
  common.interactionReply(interaction, construct(client, msg, args))
}

const run = (client, msg, args) => {
  // Reply with an embed message.
  common.sendEmbed(msg, construct(client, msg, args))
}

module.exports = {
  name: 'coin',
  desc: 'Throws a coin and shows the result (heads or tails).',
  aliases: ['headsortails'],
  usage: 'coin',
  slash_command: {
    description: 'Throws a coin and shows the result (heads or tails).'
  },
  slash,
  run
}
