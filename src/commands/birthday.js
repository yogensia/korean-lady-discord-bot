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
 * Send an error message when an invalid date is provided.
 * @returns {string} Error string.
 */
const invalidDate = () => {
  return 'Error: Invalid date format. Please, use correct format (DD/MM).'
}

/**
 * Handles birthday command when the `upcoming` argument is provided.
 *
 * @param {Object} interaction Interaction object.
 * @param {Object} args Array of arguments.
 */
const argumentList = (interaction, args) => {
  let size = 10

  // Check for size argument.
  if (args && args[0].name === 'number') {
    size = args[0].value
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
    common.interactionReply(interaction, message)
  }).catch(err => console.log(err))
}

/**
 * Shows a user their own birthday date if they have set it already or a message indicating otherwise.
 *
 * @param {Object} interaction Interaction object.
 */
const argumentCheck = (interaction) => {
  pg.birthdayGet(interaction.user.id).then((res) => {
    // If database response is empty for current user, abort!
    if (!res) {
      return common.interactionReply(interaction, 'Your birthday hasn\'t been set yet. You can use `/birthday set DD/MM` to set it.', true)
    }

    const birthday = res.birthday
    var daysleft = time.daysUntilBirthday(birthday)

    // Send confirmation message.
    common.interactionReply(interaction, `${common.displayName(interaction)}, your birthday is set to ${time.convertDate(birthday)}. That's in ${daysleft} days!`)
  }).catch(err => console.log(err))
}

/**
 * Handles birthday command when the `set` argument is provided.
 *
 * @param {Object} interaction Interaction object.
 * @param {Object} args Array of arguments.
 */
const argumentSet = (interaction, args) => {
  // Enforce use of slashes.

  // Check for size argument.
  let date
  if (args && args[0].name === 'date') {
    date = args[0].value.replace('-', '/')
  }

  // If year was provided, discard it.
  date = date.split('/').slice(0, 2).join('/')

  if (time.validateDate(date) && time.validateDateFormat(date)) {
    // Set birthday on db.
    pg.birthdaySet(interaction.user.id, date, interaction.user.username).then(() => {
      const daysLeft = time.daysUntilBirthday(date)
      const daysString = daysLeft === 365 ? 'That\'s today!' : `That's in ${daysLeft} days`

      // Send confirmation message.
      common.interactionReply(interaction, `${common.displayName(interaction)}, your birthday has been set to ${time.convertDate(date)}. ${daysString}!`)
    }).catch(err => console.log(err))
  } else {
    common.interactionReply(interaction, invalidDate(), true)
  }
}

/**
 * Handles birthday command when the `unset` argument is provided.
 *
 * @param {Object} interaction Interaction object.
 */
const argumentDelete = (interaction) => {
  // Unset birthday on db.
  pg.birthdayUnset(interaction.user.id).then(() => {
    // Send confirmation message.
    common.interactionReply(interaction, `${common.displayName(interaction)}, your birthday has been deleted.`, true)
  }).catch(err => console.log(err))
}

const slash = async (client, msg, interaction) => {
  // Get array of actions.
  const actions = []
  interaction.options.data.forEach(option => {
    actions.push(option.name)
  })

  // Check for main action to perform.
  const action = actions.shift()

  // Get arguments.
  const args = interaction.options.data[0].options

  // Arguments found.
  if (action === 'list') {
    argumentList(interaction, args)
  } else if (action === 'check') {
    argumentCheck(interaction)
  } else if (action === 'set') {
    argumentSet(interaction, args)
  } else if (action === 'delete') {
    argumentDelete(interaction)
  }
}

const run = (client, msg, args) => {
  // Send deprecated command message.
  common.sendDeprecatedCommandMsg(client, msg)
}

module.exports = {
  name: 'birthday',
  desc: 'Allows a user to set or unset their birthday date, or see a list of upcoming birthdays. If no argument is provided, the bot will show the user\'s current birthday date, if it is present in the database.\n\nThe bot will send a notification on chat at 8 AM CET whenever it\'s someone\'s birthday.\n\nWhen adding your birthday date, please use the format DD/MM.',
  aliases: ['bday', 'bd'],
  usage: 'birthday [set DD/MM|unset|upcoming]',
  examples: ['birthday', 'birthday set 31/12', 'birthday unset', 'birthday upcoming'],
  slash_command: {
    description: 'Allows you to add your birthday, or see upcoming birthdays',
    options: [
      {
        name: 'list',
        description: 'Shows a list of upcoming birthdays',
        type: 1,
        options: [
          {
            name: 'number',
            description: 'Number of birthdays to show',
            type: 4,
            required: false
          }
        ]
      },
      {
        name: 'check',
        description: 'Let\'s you double check your birthday date',
        type: 1
      },
      {
        name: 'set',
        description: 'Sets your birthday',
        type: 1,
        options: [
          {
            name: 'date',
            description: 'Date in \'DD/MM\' format. Ex: 31/12',
            type: 3,
            required: true
          }
        ]
      },
      {
        name: 'delete',
        description: 'Removes your birthday from the list',
        type: 1
      }
    ]
  },
  slash,
  run
}
