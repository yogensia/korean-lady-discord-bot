const math = require('./math')

/**
 * Returns a random sticker emote url.
 *
 * @return {string} A random sticker emote url.
 */
const sticker = () => {
  const sticker_array = [
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
    'https://i.imgur.com/smWsdrf.png', // Yikes
  ]
  return math.getRandomStringFromArray(sticker_array)
}

/**
 * Returns a random exclamation.
 * Ex: `WOAH!`, `Cool!`
 *
 * @return {string} A random exclamation string.
 */
const exclamation = () => {
  const exclamation_array = [
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
    'WOW!',
  ]
  return math.getRandomStringFromArray(exclamation_array)
}

module.exports = {
  exclamation,
  sticker
}
