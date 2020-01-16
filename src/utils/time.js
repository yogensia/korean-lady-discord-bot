const moment = require('moment-timezone')
const math = require('../utils/math')

const getNow = () => {
  return moment()
}

/**
 * Returns a randomized time string set up to 20 years in the future.
 *
 * @param {string} format A time/date format, ex: 'YYYY-MM-DD HH:mm:ss'.
 * @returns {string} Time string in the requested format.
 */
const getRandomFuture = (format) => {
  const now = moment()
  const trim = math.getRandomInt(1, 8)

  // Randomly generated deltas for each time unit.
  const delta = {
    years: math.getRandomInt(1, 19),
    months: math.getRandomInt(1, 11),
    days: math.getRandomInt(1, 28),
    hours: math.getRandomInt(1, 23),
    minutes: math.getRandomInt(1, 59),
    seconds: math.getRandomInt(1, 59)
  }

  // Use random trim so that very short bans (seconds, minutes) are more common.
  if (trim > 5) now.add(delta.years, 'years')
  if (trim > 4) now.add(delta.months, 'months')
  if (trim > 3) now.add(delta.days, 'days')
  if (trim > 2) now.add(delta.hours, 'hours')
  if (trim > 1) now.add(delta.minutes, 'minutes')
  now.add(delta.seconds, 'seconds')

  return now.format(format)
}

/**
 * Get a formatted string counting down to a future date.
 *
 * @param {string} timeString A time string, ex: '1990-12-31'.
 * @param {*} format A format matching `timeString`, ex: 'YYYY-MM-DD'.
 * @returns {string} A formatted countdown string, ex: '3 months, 10 days, 12 minutes'.
 */
const getCountdown = (timeString, format) => {
  const now = moment()
  const future = moment(timeString, format)
  const output = []

  // Get remainder differences in years, months, days...
  // This may be a litle innacurate but... ¯\_(ツ)_/¯
  const years = future.diff(now, 'years')
  const months = future.diff(now, 'months') % 12
  const days = future.diff(now, 'days') % 30
  const hours = future.diff(now, 'hours') % 24
  const minutes = future.diff(now, 'minutes') % 60
  const seconds = future.diff(now, 'seconds') % 60

  // Only add the parts of the string that are greater than zero.
  if (years > 0) output.push(`${years} years`)
  if (months > 0) output.push(`${months} months`)
  if (days > 0) output.push(`${days} days`)
  if (hours > 0) output.push(`${hours} hours`)
  if (minutes > 0) output.push(`${minutes} minutes`)
  if (seconds > 0) output.push(`${seconds} seconds`)

  return output.join(', ')
}

/**
 * Checks if the difference between now and a future date is greater than a year.
 *
 * @param {string} timeString A time string, ex: '1990-12-31'.
 * @param {*} format A format matching `timeString`, ex: 'YYYY-MM-DD'.
 * @returns {Boolean} True if the difference is greater than a year.
 */
const longerThanYear = (timeString, format) => {
  const now = moment()
  const future = moment(timeString, format)

  if (future.diff(now, 'years') > 0) {
    return true
  } else {
    return false
  }
}

/**
 * Change the format of a date or time string.
 *
 * @param {string} timeString A time string, ex: '1990-12-31'.
 * @param {*} oldFormat A format matching `timeString`, ex: 'YYYY-MM-DD'.
 * @param {*} newFormat A new format, ex: 'YYYY-MM-DD HH:mm:ss'.
 * @returns {string} Time string in new format.
 */
const format = (timeString, oldFormat, newFormat) => {
  return moment(timeString, oldFormat).format(newFormat)
}

module.exports = {
  getNow,
  getRandomFuture,
  getCountdown,
  longerThanYear,
  format
}
