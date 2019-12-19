const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !heavenorhell [subject]
 *
 * Shows whether a user will go to heaven or hell, and the prediction accuracy. Subject can be omitted, if so the user what used the command will be used as subject.
 */
exports.run = (client, msg, args) => {
  let subject = args.join(' ')
  subject     = subject.stripMention(subject, msg)

  // Random intro and prediction accuracy.
  const answer = [
    'The gods have decree...',
    'Apollo has determined...',
    'The jury has decided...',
    'The Dalai Lama has spoken...',
    'The prophecy has revealed...'
  ]
  const result = math.getRandomInt(0, answer.length - 1)
  const acuracy = math.getRandomFloat(0, 110).toFixed(2)

  // Random heaven or hell destination!
  let destiny = math.getRandomInt(0, 1)
  if (1 === destiny) {
    destiny = 'is going to Heaven! :innocent:'
  } else {
    destiny = 'is going to Hell! :flame:'
  }

  // Make sure a there is a subject.
  if ('' === subject) {
    msg.channel.send(`${answer[result]}* ${msg.author.username} **${destiny}**\n(_*actual prediction acuracy of ${acuracy}%_)`)
  } else {
    msg.channel.send(`${answer[result]}* ${subject} **${destiny}**\n(_*actual prediction acuracy of ${acuracy}%_)`)
  }
}