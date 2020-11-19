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
 * @param {Object} tempArray - Optional array for storing previously selected items, only used if `shift=true`.
 * @return {string} Randomly selected string.
 */
const getRandomStringFromArray = (array, shift = true, tempArray = false) => {
  if (shift) {
    const item = array.sort(() => Math.random() - 0.5).shift()

    // If a temporary array is defined, store previous values there.
    if (Array.isArray(tempArray)) {
      tempArray.push(item)
    }

    return item
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
