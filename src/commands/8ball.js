const common = require('../utils/common')
const math = require('../utils/math')

// 8 ball answers.
let answer
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
  'You may rely on it.',
  '🥔'
]

const construct = (client, msg, args) => {
  // Get subject from args.
  const question = common.stripMentions(args.join(' '), msg, false)

  // Random answer with Potato check, 1/5 chance for omasa, 1/21 chance for others.
  if (msg.author.username.toLowerCase() === 'omasa' && math.getRandomInt(1, 5) === 1) {
    answer = '🥔'
  } else {
    answer = math.getRandomStringFromArray(answers)
  }

  // Return message.
  return `**${common.displayName(msg)} asks: ${question}**\n🎱 ${answer} 🎱`
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
  name: '8ball',
  desc: 'Uses an 8 ball to answer a question.',
  usage: '8ball <question>',
  examples: ['8ball Will I pass my exam?'],
  args: true,
  args_error: 'You must ask a question!',
  slash_command: {
    description: 'Uses an 8 ball to answer a question',
    options: [
      {
        name: 'question',
        value: 'question',
        description: 'Your question',
        type: 3,
        required: true
      }
    ]
  },
  slash,
  run
}
