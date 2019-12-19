const math = require('../utils/math')

/**
 * COMMAND: !8ball <question>
 *
 * Uses an 8 ball to answer a question.
 */
exports.run = (client, msg, args) => {
  const question = args.join(' ')
  const answer = [
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
  const result = math.getRandomInt(0, answer.length - 1)

  // Make sure question is not empty.
  if ('' === question) {
    msg.channel.send(`Missing parameter: You didn\'t ask a question! :rage:\n Example: \`!8ball Will I pass my next exam?\``)
  } else {
    msg.channel.send(`${msg.author.username} asks: **${question}**\n:8ball: ${answer[result]} :8ball:`)
  }
}