/**
 * Replace user mentions with plain text usernames.
 *
 * @param {string} subject - User string to strip.
 * @param {Message} msg - Message object.
 * @return {string} A plain text username.
 */
String.prototype.stripMention = (subject, msg) => {
  if (subject.startsWith('<@')) {
    // Get username of first mention, ignoring the rest if more than one.
    for (var [key, value] of msg.mentions.users) {
      if (msg.author.username === value.username) {
        subject = 'himself/herself'
      } else {
        subject = value.username
      }
      return subject
    }
  } else {
    return subject
  }
}

/**
 * Show a server emote.
 *
 * @param {string} name Name of the emote (ex: peepoPants).
 * @param {Client} client Client object.
 */
const showEmote = (name, client) => {
  return client.emojis.find(emoji => emoji.name === name)
}

/**
 * Show a server emote.
 *
 * @param {string} name Name of the emote (ex: peepoPants).
 * @param {Client} client Client object.
 */
const sendMissingParameterMsg = (client, msg, reason, syntax) => {
  const emote_angry = showEmote('Angry', client)
  msg.channel.send(`${emote_angry} **Missing parameter:** ${reason}\n Example: \`${client.env.prefix}${syntax}\``)
}

module.exports = { showEmote, sendMissingParameterMsg }
