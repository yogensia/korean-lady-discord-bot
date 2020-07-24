const TurndownService = require('turndown')
const tds = new TurndownService()

const random = require('../utils/random')
const math = require('../utils/math')

/**
 * Capitalizes the first letter in a string.
 *
 * @param {string} string - String to capitalize.
 * @return {string} The capitalized string.
 */
const capitalize = (string) => {
  if (typeof string !== 'string') return ''
  string = string.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}

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
  if (subject.toLowerCase() === 'koreanlady' ||
  subject.toLowerCase() === 'korean lady' ||
  subject.toLowerCase() === 'koreanladyushka' ||
  subject.toLowerCase() === 'korean ladyushka') {
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
const reactWithCustomEmote = async (client, msg, name, fallback) => {
  const emote = getCustomEmote(client, name, fallback)

  // If emote is available react to user's message.
  if (emote.id) {
    await msg.react(emote.id).catch(err => console.log(new Error(err)))
  } else if (emote) {
    // If custom emote is not available, check if a fallback was provided,
    // and if so, use that.
    await msg.react(fallback).catch(err => console.log(new Error(err)))
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

/**
 * Send a spam warning message.
 *
 * @param {Object} client Client object.
 * @param {Object} msg Message object.
 */
const sendSpamMsg = (client, msg) => {
  // Emotes.
  const emoteThanks = getCustomEmote(client, 'ihaa', '❤')

  // Send a reply with the warning.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: `Sorry ${displayName(msg)}, ${process.env.PREFIX}${client.cmd.name} is a bit too spammy for this channel, please use it in <#${client.spamChannel.id}> instead. Thank you! ${emoteThanks}`,
      footer: {
        text: 'This message will self-destruct in 30 seconds... 👀'
      }
    }
  }).then(msg => msg.delete({ timeout: 30000 }))
    .catch(err => console.log(new Error(err)))
}

/**
 * Trims a paragraph making sure the last sentence is complete, and optionally adds a "More Link".
 *
 * @param {string} paragraph Paragraph string to trim.
 * @param {string} moreUrl Optional url string for a "Read More" link.
 * @param {bool} turndown If true, to convert HTML tags to markdown syntax, default is `false`.
 * @param {integrer} length Optional maximum length for the paragraph, default is `350`.
 * @returns {string} A paragraph string.
 */
const trimParagraph = (paragraph, moreUrl = '', turndown = false, length = 350) => {
  // Trim paragraph to desired length.
  const descriptionMaxLength = length
  if (paragraph.length > descriptionMaxLength) {
    paragraph = paragraph.substring(0, descriptionMaxLength - 3).trim()
  } else {
    paragraph = paragraph.trim()
  }

  // If turndown parameter is true, convert HTML tags to markdown syntax.
  paragraph = tds.turndown(paragraph)

  // Discard last sentence if it was truncated.
  const descArray = paragraph.split('. ')
  if (descArray[descArray.length - 1].substr(descArray[descArray.length - 1].length - 1) !== '.') {
    descArray.pop()
    // If moreUrl parameter is set, add a Read More link after the paragraph.
    if (moreUrl) {
      paragraph = descArray.join('. ') + `...
      [Read more...](${moreUrl})`
    }
  }

  return paragraph
}

/**
 * Returns a random subject string.
 *
 * @param {bool} singular If true, will only return singular subjects (such as 'chat'), default is `false`.
 * @returns {string} A randon subject string.
 */
const randomSubject = (singular = false) => {
  // Subjects.
  const subjects = [
    'chat',
    'every merd',
    'every merd in chat',
    'every nerd',
    'every nerd in chat',
    'every nerd & merd',
    'everyone',
    'everyone in chat'
  ]

  if (!singular) {
    subjects.push(
      'all merds',
      'all merds in chat',
      'all nerds',
      'all nerds in chat',
      'all nerds & merds'
    )
  }

  return math.getRandomStringFromArray(subjects)
}

module.exports = {
  capitalize,
  displayName,
  getCustomEmote,
  reactWithCustomEmote,
  koreanLadyMentioned,
  randomSubject,
  sendErrorMsg,
  sendMissingParameterMsg,
  sendSpamMsg,
  stripMentions,
  trimParagraph
}
