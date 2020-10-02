const moment = require('moment-timezone')
const common = require('../utils/common')
const pg = require('../utils/pg')
const time = require('../utils/time')

/**
 * Comparison function, sorts birthday array elements by Unix timestamp.
 */
const birthdaySort = (a, b) => {
  if (a.timestamp < b.timestamp) {
    return -1
  }
  if (a.timestamp > b.timestamp) {
    return 1
  }
  return 0
}

/**
 * Send and error message when an invalid dae is provided.
 *
 * @param {Object} msg Message object.
 */
const invalidDate = (msg) => {
  common.sendErrorMsg(msg, `Error: Invalid date format.
    Please, use correct format (DD/MM) or type \`${process.env.PREFIX}help birthday\` for details.`)
}

/**
 * Handles birthday command when the `unset` argument is provided.
 *
 * @param {Object} msg Message object.
 */
const argumentInvalid = (msg) => {
  common.sendErrorMsg(msg, `Error: Missing or invalid arguments.
    Please, use correct syntax or type \`${process.env.PREFIX}help birthday\` for details.`)
}

/**
 * Handles birthday command when the `set` argument is provided.
 *
 * @param {Object} msg Message object.
 * @param {Object} args Array of arguments.
 */
const argumentSet = (msg, args) => {
  // Enforce use of slashes.
  let date = args[1].replace('-', '/')

  // If year was provided, discard it.
  date = date.split('/').slice(0, 2).join('/')

  if (time.validateDate(date) && time.validateDateFormat(date)) {
    // Set birthday on db.
    pg.birthdaySet(msg.author.id, date, msg.author.username).then(() => {
      var daysleft = time.daysUntilBirthday(date)

      // Send confirmation message.
      common.sendEmbed(msg, `${common.displayName(msg)}, your birthday has been set to ${time.convertDate(date)}. That's in ${daysleft} days!`)
    }).catch(err => common.sendErrorMsg(msg, err))
  } else {
    invalidDate(msg)
  }
}

/**
 * Handles birthday command when the `unset` argument is provided.
 *
 * @param {Object} msg Message object.
 */
const argumentUnset = (msg) => {
  // Unset birthday on db.
  pg.birthdayUnset(msg.author.id).then(() => {
    // Send confirmation message.
    common.sendEmbed(msg, `${common.displayName(msg)}, your birthday has been unset.`)
  }).catch(err => common.sendErrorMsg(msg, err))
}

/**
 * Handles birthday command when the `upcoming` argument is provided.
 *
 * @param {Object} msg Message object.
 * @param {Object} args Array of arguments.
 */
const argumentUpcoming = (msg, args) => {
  let size = 10

  // Check for size argument.
  if (Array.isArray(args) && args.length > 1) {
    size = args[1]
  }

  const upcomingBirthdays = []
  const ts = moment().format('X')

  // Get birthday array.
  pg.birthdayGetAll().then((birthdayArray) => {
    // Limit maximum birthdays to show to be equal to the number of records in database.
    if (size > birthdayArray.length) {
      size = birthdayArray.length
    }

    // Add timestamp to birthday Array.
    birthdayArray.forEach(user => {
      user.timestamp = moment(user.birthday, 'DD/MM').format('X')
    })

    // Sort Birthdays by date.
    const sortedArray = birthdayArray.sort(birthdaySort)

    // Iterate and filter the 5 next birthdays for the rest of the year.
    sortedArray.forEach(user => {
      // If current TS is lower than birthday, add it to the new array,
      // until we have added enough.
      if (ts <= user.timestamp && size > 0) {
        upcomingBirthdays.push(user)
        size--
      }
    })

    // If not enough birthdays found, iterate and filter the birthdays
    // starting on January as well until array size is reached.
    sortedArray.forEach(user => {
      if (size > 0) {
        upcomingBirthdays.push(user)
        size--
      }
    })

    // Build output.
    let message = '**Upcoming Birthdays:**\n'

    upcomingBirthdays.forEach(user => {
      message = message + `- **${user.discord_name}** (${moment(user.birthday, 'DD/MM').format('MMMM Do')})\n`
    })

    // Show data on Discord.
    common.sendEmbed(msg, message)
  }).catch(err => common.sendErrorMsg(msg, err))
}

/**
 * Handles birthday command when no argument is provided.
 *
 * @param {Object} msg Message object.
 */
const argumentNone = (msg) => {
  pg.birthdayGet(msg.author.id).then((res) => {
    // If database response is empty for current user, abort!
    if (!res) {
      return msg.channel
        .send(`Your birthday hasn't been set yet. You can use \`${process.env.PREFIX}birthday set DD/MM\` to set it.`)
        .catch(err => common.sendErrorMsg(msg, err))
    }

    const birthday = res.birthday
    var daysleft = time.daysUntilBirthday(birthday)

    // Send confirmation message.
    common.sendEmbed(msg, `${common.displayName(msg)}, your birthday is set to ${time.convertDate(birthday)}. That's in ${daysleft} days!`)
  }).catch(err => common.sendErrorMsg(msg, err))
}

const run = async (client, msg, args) => {
  const action = args[0]

  // No arguments found.
  if (Array.isArray(args) && !args.length) {
    return argumentNone(msg)
  }

  // Arguments found.
  if (action === 'set') {
    argumentSet(msg, args)
  } else if (action === 'unset') {
    argumentUnset(msg)
  } else if (action === 'upcoming') {
    argumentUpcoming(msg, args)
  } else {
    argumentInvalid(msg)
  }
}

module.exports = {
  name: 'birthday',
  desc: 'Allows a user to set or unset their birthday date, or see a list of upcoming birthdays. if no argument is provided, the bot will show the user\'s current birthday date, if it is present in the database.\n\nThe bot will send a notification on chat at 8 AM CET whenever it\'s someone\'s birthday.\n\nWhen adding your birthday date, please use the format DD/MM.',
  aliases: ['bday', 'bd'],
  usage: 'birthday [set DD/MM|unset|upcoming]',
  examples: ['birthday', 'birthday set 31/12', 'birthday unset', 'birthday upcoming'],
  run
}
