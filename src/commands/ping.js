const common = require('../utils/common')

const run = (client, msg, args) => {
  // Try to react using a custom server emote.
  common.reactWithCustomEmote(client, msg, 'peepoPants', '👍')
}

module.exports = {
  name: 'ping',
  desc: 'Simple ping command to test bot is online.',
  usage: 'ping',
  run
}
