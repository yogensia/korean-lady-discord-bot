const common = require('../utils/common')

exports.run = (client, msg, args) => {
  // Try to get custom emotes.
  const emote_apolcool = common.showEmote('apolCool', client)
  const emote_peepopants = common.showEmote('peepoPants', client)

  // If emote is available use it, otherwise send a normal message.
  if (null !== emote_apolcool) {
    msg.react(emote_apolcool)
  } else if (null !== emote_peepopants) {
    msg.react(emote_peepopants)
  } else {
    msg.channel.send('Hey!')
  }
}
