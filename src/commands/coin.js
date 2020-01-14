const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  // Get random coin toss.
  const result = math.getRandomInt(0, 1)

  let message
  if (result === 1) {
    message = `${msg.author.username} threw a coin... The result was **Heads**!`
  } else {
    message = `${msg.author.username} threw a coin... The result was **Tails**!`
  }

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: message
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'coin',
  desc: 'Throws a coin and shows the result (heads or tails).',
  aliases: ['headsortails'],
  usage: 'coin',
  run
}
