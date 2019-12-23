/**
 * Replace user mentions with plain text usernames.
 *
 * @param {string} subject - User string to strip.
 * @param {Object} msg - Message object.
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
 * Try to get a custom emote, if not found, a fallback icon will be used.
 * Fallback emote should ALWAYS be a standard emote.
 *
 * Use `emote.id` when reacting to msg's with custom emotes!
 *
 * @param {Object} client Client object.
 * @param {string} name Name of the emote (ex: peepoPants).
 * @param {string} fallback Name of a fallback emote (ex: joy).
 * @returns {(Object|string)} The emote string.
 */
const getCustomEmote = (client, name, fallback) => {
  const emote = client.emojis.find(emoji => emoji.name === name)

  // If emote is available return it.
  if (null !== emote) {
    return emote
  } else {
    return `:${fallback}:`
  }
}

/**
 * Send a "missing parameter" message with an explanation and expected syntax.
 *
 * @param {Object} client Client object.
 * @param {Object} msg Message object.
 * @param {string} reason Reason why the sendMissingParameterMsg() method is being used.
 * @param {string} client Syntax example for this command, with command and arguments, without prefix.
 */
const sendMissingParameterMsg = (client, msg, reason, syntax) => {
  const emote_angry = getCustomEmote('Angry', client)
  msg.channel.send(`${emote_angry} **Missing parameter:** ${reason}\n Example: \`${client.env.prefix}${syntax}\``)
}

module.exports = { getCustomEmote, sendMissingParameterMsg }
