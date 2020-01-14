/**
 * Return true if values provided are equal.
 *
 * @param {(string|number)} arg - Array of elements to compare.
 * @return {Boolean} True if equal, false if not equal.
 */
const areEqual = (arg) => {
  if (arg.every((v, i, a) =>
    v === a[0] &&
    v !== null
  )) {
    return true
  } else {
    return false
  }
}

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - Min number.
 * @param {number} max - Max number.
 * @return {number} A random integer.
 */
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - Min number.
 * @param {number} max - Max number.
 * @return {number} A random floating point number.
 */
const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min
}

/**
 * Get a random string from an array.
 *
 * @param {string[]} array - Array of strings to choose from.
 * @return {string} Randomly selected string.
 */
const getRandomStringFromArray = (array) => {
  const key = getRandomInt(0, array.length - 1)
  return array[key]
}

/**
 * Converts seconds to a full time string.
 *
 * This method also randomly ommits years, months, days, etc to create
 * more variety (otherwise most times it would return several years).
 *
 * @param {number} time Number string representing seconds.
 * @return {string} Formatted time string.
 */
const toFakeTimeString = (time) => {
  // Total amount of seconds.
  let delta = time

  // Calculate (and subtract) whole years.
  const years = Math.floor(delta / 31556952)
  delta -= years * 31556952

  // Calculate (and subtract) whole months.
  const months = Math.floor(delta / 2592000)
  delta -= months * 2592000

  // Calculate (and subtract) whole days.
  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  // Calculate (and subtract) whole hours.
  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  // Calculate (and subtract) whole minutes.
  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  // What's left is seconds.
  const seconds = delta % 60

  // Get more varied results by randomly trimming the time string.
  const randomTrim = getRandomInt(0, 8)
  let output = ''

  // Build output string.
  if (randomTrim > 5 && years >= 1) { output += years + ' years, ' }
  if (randomTrim > 4 && months >= 1) { output += months + ' months, ' }
  if (randomTrim > 3 && days >= 1) { output += days + ' days, ' }
  if (randomTrim > 2 && hours >= 1) { output += hours + ' hours, ' }
  if (randomTrim > 1 && minutes >= 1) { output += minutes + ' minutes, ' }
  if (seconds >= 1) { output += seconds + ' seconds' }

  // Aproximate new total seconds value and calculate ban expiring date.
  delta = 0
  if (randomTrim > 5 && years >= 1) { delta += years * 31556952 }
  if (randomTrim > 4 && months >= 1) { delta += months * 2592000 }
  if (randomTrim > 3 && days >= 1) { delta += days * 86400 }

  // Convert to milliseconds.
  delta = delta * 1000

  // Get expiration date.
  const banExp = new Date(Date.now() + delta)

  const monthArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const month = banExp.getMonth() - 1

  // Return string. If the ban is longer than a year show the expiration date as well.
  if (delta > 1000 * 60 * 60 * 24 * 30 * 12) {
    return `${output}! See you in ${monthArray[month]} ${banExp.getDate()}, ${banExp.getFullYear()}! :👋:`
  } else {
    return `${output}!`
  }
}

module.exports = {
  areEqual,
  getRandomInt,
  getRandomFloat,
  getRandomStringFromArray,
  toFakeTimeString
}
