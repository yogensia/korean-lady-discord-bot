const math = require('../utils/math')

const run = (client, msg, args) => {
  const question = args.join(' ')

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
  const answer = math.getRandomStringFromArray(answers)

  // Send message.
  msg.channel.send(`${msg.author.username} asks: **${question}**\n🎱 ${answer} 🎱`)
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
