const random = require('../utils/random')

/**
 * Replace user mentions with plain text usernames.
 *
 * @param {string} subject - User string to strip.
 * @param {Object} msg - Message object.
 * @return {string} A plain text username.
 */
const stripMentions = (subject, msg) => {
  const input = subject.split(' ')

  // Replace user mentions with plain text.
  let output = input.map((element) => {
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
  output = output.map((element) => {
    if (msg.author.username === element) {
      return 'himself/herself'
    } else {
      return element
    }
  })

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
 * @param {string} fallback Fallback emote unicode (ex: ❤️).
 * @returns {(Object|string|Boolean)} The emote object, fallback string or an empty string.
 */
const getCustomEmote = (client, name, fallback) => {
  const emote = client.emojis.find(emoji => emoji.name === name)

  // If emote is available return it.
  if (emote !== null) {
    return emote
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
    msg.react(emote.id).catch(() => {
      console.log(`Unknown emote requested: ${name}`)
    })
  } else if (emote) {
    // If custom emote is not available, check if a fallback was provided,
    // and if so, use that.
    msg.react(fallback).catch(() => {
      console.log(`Unknown fallback emote requested: ${fallback}`)
    })
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
      description: `${value}`
    }
  }).catch((error) => {
    // Send an embed message with the error.
    console.log(new Error(error))
  })
}

/**
 * Send an "exception" message.
 *
 * @param {Object} msg Message object.
 * @param {string} value String describing the error.
 */
const sendExceptionMsg = (msg, value) => {
  // Send an embed message with the error.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: `${value}`
    }
  }).catch((error) => {
    // Send an embed message with the error.
    console.log(new Error(error))
  })
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
        icon_url: 'https://i.imgur.com/xvJNaak.png' // concernFroge image.
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
  })
}

module.exports = {
  getCustomEmote,
  reactWithCustomEmote,
  sendErrorMsg,
  sendExceptionMsg,
  sendMissingParameterMsg,
  stripMentions
}
