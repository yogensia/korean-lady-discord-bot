const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  // Get subject from args.
  const question = common.stripMentions(args.join(' '), msg, false)
  let answer

  // Potato check, 1/5 chance for omasa, 1/20 chance for others.
  if (msg.author.username.toLowerCase() === 'omasa' && math.getRandomInt(1, 5) === 1) {
    answer = '🥔'
  } else if (math.getRandomInt(1, 20) === 1) {
    answer = '🥔'
  } else {
    // Random 8 ball answer.
    const answers = [
      'As I see it, yes.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      'Don’t count on it.',
      'It is certain.',
      'It is decidedly so.',
      'Most likely.',
      'My reply is no.',
      'My sources say no.',
      'Outlook not so good.',
      'Outlook good.',
      'Reply hazy, try again.',
      'Signs point to yes.',
      'Very doubtful.',
      'Without a doubt.',
      'Yes.',
      'Yes – definitely.',
      'You may rely on it.'
    ]
    answer = math.getRandomStringFromArray(answers)
  }

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: `**${common.displayName(msg)} asks: ${question}**\n\n🎱 ${answer} 🎱`
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: '8ball',
  desc: 'Uses an 8 ball to answer a question.',
  usage: '8ball <question>',
  examples: ['8ball Will I pass my exam?'],
  args: true,
  args_error: 'You must ask a question!',
  run
}
