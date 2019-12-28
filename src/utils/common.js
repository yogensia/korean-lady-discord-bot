/**
 * Replace user mentions with plain text usernames.
 *
 * @param {string} subject - User string to strip.
 * @param {Object} msg - Message object.
 * @return {string} A plain text username.
 */
String.prototype.stripMentions = (subject, msg) => {
  const input = subject.split(' ')

  // Replace user mentions with plain text.
  let output = input.map(function(element) {
    if (/@(everyone|here)/.test(element)) {
      return element.replace(/@(everyone|here)/g, '\u200b$1')
    } else if (element.startsWith('<@')) {
      // Get username for each mention found.
      const id = element.replace(/<|!|>|@/g, '')

      if (msg.channel.type === 'dm' || msg.channel.type === 'group') {
        return msg.client.users.has(id) ? `${msg.client.users.get(id).username}` : element
      }

      const member = msg.channel.guild.members.get(id)
      if (member) {
        if (member.nickname) return `${member.nickname}`
        return `${member.user.username}`
      } else {
        const user = msg.client.users.get(id)
        if (user) return `${user.username}`
        return element
      }
    } else {
      return element
    }
  })

  // Is a user mentions themselves use special string.
  output = output.map(function(element) {
    if (msg.author.username === element) {
      return 'himself/herself'
    } else {
      return element
    }
  })

  return output.join(' ')
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
 */
const sendMissingParameterMsg = (client, msg, reason) => {
  // Build description, usage & example strings.
  const desc  = `${client.cmd.desc}`
  const usage = `\`${client.env.prefix}${client.cmd.usage}\``
  const example_array = client.cmd.examples.map(function(element) {
    return `\`${client.env.prefix}${element}\``
  })
  const examples = example_array.join(' ')

  // Send error message in a nice and clean embed.
  msg.channel.send({
    embed: {
      color: 3447003,
      fields: [
        {
          name: 'Missing parameter',
          value: reason,
        },
        {
          name: 'Description',
          value: desc,
        },
        {
          name: 'Usage',
          value: usage,
        },
        {
          name: 'Examples',
          value: examples,
        }
      ]
    }
  })
}

module.exports = { getCustomEmote, sendMissingParameterMsg }
