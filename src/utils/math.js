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
 * @param {Boolean} shift - If `true`, shift (remove) selected element from array. Defaults to `true`.
 * @return {string} Randomly selected string.
 */
const getRandomStringFromArray = (array, shift = true) => {
  if (shift) {
    return array.sort(() => Math.random() - 0.5).shift()
  } else {
    array.sort(() => Math.random() - 0.5)
    return array[0]
  }
}

module.exports = {
  areEqual,
  getRandomInt,
  getRandomFloat,
  getRandomStringFromArray
}
