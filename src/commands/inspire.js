const inspirobot = require('../utils/inpirobot')

const construct = (client, msg, args) => {
  // Return message.
  return inspirobot.request()
}

const slash = async (client, msg, interaction, args) => {
  // Reply with an embed message.
  interaction.reply({
    embeds: [{
      color: 0x2f3136,
      image: {
        url: await construct(client, msg, args)
      }
    }]
  }).catch(err => console.log(err))
}

const run = async (client, msg, args) => {
  // Reply with an image embed message.
  msg.channel.send({
    embeds: [{
      color: 0x2f3136,
      image: {
        url: await construct(client, msg, args)
      }
    }]
  }).catch(err => console.log(err))
}

module.exports = {
  name: 'inspire',
  desc: 'Shows you an inspirational quote image from InspiroBot.',
  usage: 'inspire',
  examples: ['inspire'],
  slash_command: {
    description: 'Shows you an inspirational quote image from InspiroBot'
  },
  slash,
  run
}
