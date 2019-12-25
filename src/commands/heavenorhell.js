const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  let subject = args.join(' ')
  subject     = subject.stripMentions(subject, msg)

  // Random intro and prediction accuracy.
  const answer_array = [
    'The gods have decree...',
    'Apollo has determined...',
    'The jury has decided...',
    'The Dalai Lama has spoken...',
    'The prophecy has revealed...'
  ]
  const answer  = math.getRandomStringFromArray(answer_array)
  const acuracy = math.getRandomFloat(0, 110).toFixed(2)

  // Random heaven or hell destination!
  let destiny = math.getRandomInt(0, 1)
  if (1 === destiny) {
    destiny = 'is going to Heaven! :innocent:'
  } else {
    destiny = 'is going to Hell! :flame:'
  }

  // Check if there is a subject, if not use the message author.
  if ('' === subject) {
    msg.channel.send(`${answer}* ${msg.author.username} **${destiny}**\n(_*actual prediction acuracy of ${acuracy}%_)`)
  } else {
    msg.channel.send(`${answer}* ${subject} **${destiny}**\n(_*actual prediction acuracy of ${acuracy}%_)`)
  }
}

module.exports = {
  name: 'heavenorhell',
  desc: 'Shows whether a user will go to heaven or hell, and the prediction accuracy. Subject can be omitted, if so the user what used the command will be used as subject.',
  aliases: ['hoh', 'heaven', 'hell'],
  usage: ['heavenorhell [subject]'],
  examples: ['heavenorhell', 'heavenorhell @GeraltOfRivia', 'heavenorhell Pineapple'],
  run
}
