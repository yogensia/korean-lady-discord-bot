const common = require('../utils/common')
const math = require('../utils/math')

/**
 * Waits 1,5 seconds and then adds a random reaction to a message,
 * selected fromt he array provided.
 *
 * @param {Object} client Client object.
 * @param {Object} msg Message object.
 * @param {number} amount Reactions amount. Default is 1.
 * @param {array} reactions Array of reactions.
 */
const react = (client, msg, reactions, amount = 1) => {
  // Amount can't be bigger than the number of reactions we have set.
  if (amount > reactions.length) {
    amount = reactions.length
  }

  // Just wait a moment...
  setTimeout(() => {
    let reaction

    // React with custom emotes or its associated fallback if necessary,
    // as many times as requested.
    for (let i = 0; i < amount; i++) {
      reaction = math.getRandomStringFromArray(reactions)
      common.reactWithCustomEmote(client, msg, reaction[0], reaction[1])
    }
  }, 1500)
}

/**
 * Waits 1,5 seconds and then adds a random happy reaction to a message.
 *
 * @param {Object} client Client object.
 * @param {Object} msg Message object.
 * @param {number} amount Reactions amount. Default is 1.
 */
const reactHappy = (client, msg, amount = 1) => {
  // Ramdom emote reaction.
  const reactions = [
    ['peepoPants', '🥳'],
    ['apollo20Wow', '😍'],
    ['apolPat', '🤗'],
    ['apolLove', '❤️'],
    ['apolHyper', '😋'],
    ['POG', '😮'],
    ['ihaa', '🥰']
  ]

  react(client, msg, reactions, amount)
}

/**
 * Waits 1,5 seconds and then adds a random sad reaction to a message.
 *
 * @param {Object} client Client object.
 * @param {Object} msg Message object.
 * @param {number} amount Reactions amount. Default is 1.
 */
const reactSad = (client, msg, amount = 1) => {
  // Ramdom emote reaction.
  const reactions = [
    ['sadcat', '😢'],
    ['PepeHands', '😭'],
    ['FeelsGunMan', '☹'],
    ['Angry', '😡'],
    ['PandaSad', '😿'],
    ['PandaOhNo', '😨'],
    ['drakeban', '🤬']
  ]

  react(client, msg, reactions, amount)
}

module.exports = {
  react,
  reactHappy,
  reactSad
}
