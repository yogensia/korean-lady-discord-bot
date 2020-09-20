const common = require('../utils/common')
const pg = require('../utils/pg')
const time = require('../utils/time')

const invalidArgs = (msg) => {
  common.sendErrorMsg(msg, `Error: Missing or invalid arguments.
    Please, use correct syntax or type \`${process.env.PREFIX}help birthday\` for details.`)
}

const invalidDate = (msg) => {
  common.sendErrorMsg(msg, `Error: Invalid date format.
    Please, use correct format (DD/MM) or type \`${process.env.PREFIX}help birthday\` for details.`)
}

const run = async (client, msg, args) => {
  // Check for arguments.
  if (Array.isArray(args) && args.length) {
    const action = args[0]

    if (action === 'set') {
      // Enforce use of slashes.
      let date = args[1].replace('-', '/')

      // If year was provided, discard it.
      date = date.split('/').slice(0, 2).join('/')

      if (time.validateDate(date) && time.validateDateFormat(date)) {
        // Set birthday on db.
        pg.birthdaySet(msg.author.id, date).then(() => {
          var daysleft = time.daysUntilBirthday(date)

          // Send confirmation message.
          msg.channel
            .send(`${common.displayName(msg)}, your birthday has been set to ${time.convertDate(date)}. That's in ${daysleft} days!`)
            .catch(err => common.sendErrorMsg(msg, err))
        }).catch(err => common.sendErrorMsg(msg, err))
      } else {
        invalidDate(msg)
      }
    } else if (action === 'unset') {
      // Unset birthday on db.
      pg.birthdayUnset(msg.author.id).then(() => {
        // Send confirmation message.
        msg.channel
          .send(`${common.displayName(msg)}, your birthday has been unset.`)
          .catch(err => common.sendErrorMsg(msg, err))
      }).catch(err => common.sendErrorMsg(msg, err))
    } else {
      // If unrecognized args are provided.
      invalidArgs(msg)
    }
  } else {
    // If no args are provided.
    pg.birthdayGet(msg.author.id).then((res) => {
      // If database response is empty for current user, abort!
      if (!res) {
        return common.sendErrorMsg(msg, `Your birthday hasn't been set yet.
          You can use \`${process.env.PREFIX}birthday set DD/MM\` to set it.`)
      }

      const birthday = res.birthday
      var daysleft = time.daysUntilBirthday(birthday)

      // Send confirmation message.
      msg.channel
        .send(`${common.displayName(msg)}, your birthday is set to ${time.convertDate(birthday)}. That's in ${daysleft} days!`)
        .catch(err => common.sendErrorMsg(msg, err))
    }).catch(err => common.sendErrorMsg(msg, err))
  }
}

module.exports = {
  name: 'birthday',
  desc: 'Allows a user to set or unset their birthday date. The bot will send a notification on chat at 8 AM CET on the birthday date. When adding your birthday date, please use the format DD/MM.',
  aliases: ['bday', 'bd'],
  usage: 'birthday [set|unset DD/MM]',
  examples: ['birthday set 31/12', 'birthday unset'],
  run
}
