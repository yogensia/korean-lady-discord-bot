const common = require('../utils/common')

const run = (client, msg, args) => {
  // Try to get a custom emote from the server.
  const emote_peepopants = common.getCustomEmote(client, 'peepoPants', 'smile')

  // If emote is available react to user's message.
  if (emote_peepopants.id) {
    msg.react(emote_peepopants.id)
  } else {
    msg.channel.send('Pong!')
  }
}

module.exports = {
  name: 'ping',
  desc: 'Simple ping command to test bot.',
  aliases: ['test'],
  usage: 'ping',
  run
}
