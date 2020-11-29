const math = require('./math')

/**
 * Returns a random sticker emote url.
 *
 * @return {string} A random url.
 */
const sticker = () => {
  const array = [
    'https://i.imgur.com/RyRP4En.png', // Apollo
    'https://i.imgur.com/ndRYMZT.png', // Blush
    'https://i.imgur.com/tMgJkHb.png', // Cool
    'https://i.imgur.com/RCdtucr.png', // Cross
    'https://i.imgur.com/YRRXKHF.png', // Gun
    'https://i.imgur.com/105typP.png', // Hi
    'https://i.imgur.com/xiPTyne.png', // Hyper
    'https://i.imgur.com/tg4gjCg.png', // Lol
    'https://i.imgur.com/RumgSlc.png', // Love
    'https://i.imgur.com/CMj3e9s.png', // Pat
    'https://i.imgur.com/CuZv0A0.png', // Ree
    'https://i.imgur.com/BpHqoEm.png', // Sip
    'https://i.imgur.com/FZbx7jO.png', // Sleep
    'https://i.imgur.com/URAK43u.png', // Smug
    'https://i.imgur.com/4pH9C5u.png', // Think
    'https://i.imgur.com/0inqQTy.png', // Wow
    'https://i.imgur.com/smWsdrf.png' // Yikes
  ]
  return math.getRandomStringFromArray(array)
}

/**
 * Returns a random exclamation.
 * Ex: `WOAH!`, `Cool!`
 *
 * @return {string} A random string.
 */
const exclamation = () => {
  const array = [
    'Cool!',
    'Hey!',
    'Holy cow!',
    'Look!',
    'Look at that!',
    'Nice!',
    'Oh look!',
    'Ooh!',
    'Yay!',
    'WOAH!',
    'WOW!'
  ]
  return math.getRandomStringFromArray(array)
}

/**
 * Returns a random negative exclamation.
 * Ex: `Oh no!`, `Oh man...`
 *
 * @return {string} A random string.
 */
const exclamationNegative = () => {
  const array = [
    'Hmmm...',
    'Oh boy...',
    'Oh man...',
    'Oh no!',
    'Oopsie!',
    'Whoops!'
  ]
  return math.getRandomStringFromArray(array)
}

/**
 * Randomizes the order of items in an array.
 *
 * https://stackoverflow.com/a/2450976
 *
 * @return {string} A random url.
 */
const shuffleArray = (array) => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

module.exports = {
  exclamation,
  exclamationNegative,
  shuffleArray,
  sticker
}
