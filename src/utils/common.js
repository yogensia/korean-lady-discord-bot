const random = require('../utils/random')

/**
 * Get the message author's displayName or username.
 *
 * @param {Object} msg - Message object.
 * @return {string} The display name of the user.
 */
const displayName = (msg) => {
  if (msg.member && msg.member.displayName) {
    return msg.member.displayName
  } else {
    return msg.author.username
  }
}

/**
 * Replace user mentions with plain text usernames.
 *
 * @param {string} subject - User string to strip.
 * @param {Object} msg - Message object.
 * @return {string} A plain text username.
 */
const stripMentions = (subject, msg, pronoun = true) => {
  const input = subject.split(' ')

  // Replace user mentions with plain text.
  let output = input.map((element) => {
    if (/@(everyone|here)/.test(element)) {
      return element.replace(/@(everyone|here)/g, '\u200b$1')
    } else if (element.startsWith('<@')) {
      // Get username for each mention found.
      const id = element.replace(/<|!|>|@/g, '')

      if (msg.channel.type === 'dm' || msg.channel.type === 'group') {
        return msg.client.users.cache.has(id) ? `${msg.client.users.cache.get(id).username}` : element
      }

      const member = msg.channel.guild.members.cache.get(id)
      if (member) {
        if (member.nickname) return `${member.nickname}`
        return `${member.user.username}`
      } else {
        const user = msg.client.users.cache.get(id)
        if (user) return `${user.username}`
        return element
      }
    } else {
      return element
    }
  })

  // If a user mentions themselves use pronouns.
  let user
  if (msg.channel.type !== 'dm' && msg.channel.type !== 'group') {
    user = msg.member.displayName
  } else {
    user = msg.author.username
  }

  if (pronoun) {
    output = output.map((element) => {
      if (user === element) {
        return 'himself/herself'
      } else {
        return element
      }
    })
  }

  return output.join(' ')
}

/**
 * Try to get a custom emote, if not found, a fallback icon can be used when provided.
 * Fallback emote should ALWAYS be a standard emote.
 *
 * Use `emote.id` when reacting to msg's with custom emotes!
 *
 * @param {Object} client Client object.
 * @param {string} name Name of the emote (ex: peepoPants).
 * @param {string} [fallback] Fallback emote unicode (ex: ❤️).
 * @returns {(Object|string|Boolean)} The emote object, fallback string or an empty string.
 */
const getCustomEmote = (client, name, fallback) => {
  // client.emojis.cache.find(emoji => console.log(emoji))
  const emote = client.emojis.cache.find(emoji => emoji.name === name)

  // If emote is available return it.
  if (emote !== null && emote !== undefined) {
    return `${emote}`
  } else {
    // If emote not found check if a fallback was provided.
    if (fallback) {
      return `${fallback}`
    } else {
      // If no fallback provided return and empty string (so that nothing is sent in messages).
      return ''
    }
  }
}

/**
 * Returns true is Korean Lady is mentioned in provided string.
 *
 * @param {Object} subject String to check.
 * @returns {Boolean} True if Korean Lady is mentioned, false otherwise.
 */
const koreanLadyMentioned = subject => {
  if (subject.toLowerCase() === 'koreanlady' || subject.toLowerCase() === 'korean lady') {
    return true
  } else {
    return false
  }
}

/**
 * Reacts to a message with a custom emote.
 * If the provided emote can't be found, a fallback can be used.
 *
 * @param {Object} client Client object.
 * @param {Object} msg - Message object.
 * @param {string} name Name of the emote (ex: peepoPants).
 * @param {string} fallback Fallback emote unicode (ex: ❤️).
 */
const reactWithCustomEmote = (client, msg, name, fallback) => {
  const emote = getCustomEmote(client, name, fallback)

  // If emote is available react to user's message.
  if (emote.id) {
    msg.react(emote.id).catch(err => console.log(new Error(err)))
  } else if (emote) {
    // If custom emote is not available, check if a fallback was provided,
    // and if so, use that.
    msg.react(fallback).catch(err => console.log(new Error(err)))
  }
}

/**
 * Send an "error" message.
 *
 * @param {Object} msg Message object.
 * @param {string} value String describing the error.
 */
const sendErrorMsg = (msg, value) => {
  // Send an embed message with the error.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      author: {
        name: random.exclamationNegative(),
        icon_url: 'https://i.imgur.com/xvJNaak.png' // concernFroge
      },
      description: `${value}`
    }
  }).catch(err => console.log(new Error(err)))
}

/**
 * Send a "missing parameter" message with an explanation and expected syntax.
 *
 * @param {Object} client Client object.
 * @param {Object} msg Message object.
 * @param {string} reason Reason why the sendMissingParameterMsg() method is being used.
 */
const sendMissingParameterMsg = (client, msg, reason) => {
  // Build example strings.
  const exampleArray = client.cmd.examples.map((element) => {
    return `\`${process.env.PREFIX}${element}\``
  })
  const examples = exampleArray.join(' ')

  // Send error message in a nice and clean embed.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      author: {
        name: random.exclamationNegative(),
        icon_url: 'https://i.imgur.com/xvJNaak.png' // concernFroge
      },
      fields: [
        {
          name: 'Missing parameter',
          value: reason
        },
        {
          name: 'Examples',
          value: examples
        }
      ],
      footer: {
        text: `Type \`${process.env.PREFIX}help ${client.cmd.name}\` for more info.`
      }
    }
  }).catch(err => sendErrorMsg(msg, err))
}

module.exports = {
  displayName,
  getCustomEmote,
  reactWithCustomEmote,
  koreanLadyMentioned,
  sendErrorMsg,
  sendMissingParameterMsg,
  stripMentions
}
