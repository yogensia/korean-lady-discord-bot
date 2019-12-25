const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  const question = args.join(' ')

  // Make sure question is not empty.
  if ('' === question) {
    common.sendMissingParameterMsg(client, msg, 'You must ask a question!')
  } else {
    // Random 8 ball answer.
    const answer_array = [
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
    const answer = math.getRandomStringFromArray(answer_array)

    // Send message.
    msg.channel.send(`${msg.author.username} asks: **${question}**\n:8ball: ${answer} :8ball:`)
  }
}

module.exports = {
  name: '8ball',
  desc: 'Uses an 8 ball to answer a question.',
  usage: ['8ball <question>'],
  examples: ['8ball Will I pass my exam?'],
  run
}
