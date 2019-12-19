const common = require('../utils/common')

/**
 * COMMAND: !help
 *
 * Show a link to command list in documentation.
 */
exports.run = (client, msg, args) => {
  const emote_angry = common.showEmote('Angry', client)
  const emote_peepoPants = common.showEmote('peepoPants', client)

  msg.author.send(`You can use this DM to test commands on your own if you want! ${emote_peepoPants}`)
  msg.channel.send(`Help!? ${emote_angry} Ok, ${msg.author.username}, here's a link with a list of commands!
https://github.com/yogensia/korean-lady-discord-bot/blob/master/README.md`)
}
