const common = require('../utils/common')
const moment = require('moment-timezone')
const pg = require('../utils/pg')

/**
 * Sends an error message when a show already exists.
 *
 * @param {Object} msg Message object.
 */
const errorShowAlreadyExists = (msg) => {
  common.sendEmbed(msg, `**Error:** A show with that name already exists in the database.
    To update it, please use \`${process.env.PREFIX}track set (episode number)\`.`)
}

/**
 * Sends an error message when a show is not found.
 *
 * @param {Object} msg Message object.
 */
const errorShowNotFound = (msg) => {
  common.sendEmbed(msg, `**Error:** I couldn't find any tracked shows by that name.
    Try \`${process.env.PREFIX}track\` to see shows currently being tracked.`)
}

/**
 * Sends an error message when a user attempts to use the command in a DM.
 *
 * @param {Object} msg Message object.
 */
const errorNoDms = (msg) => {
  common.sendEmbed(msg, '**Error:** Sorry, for security reasons, this command is read-only in DMs.')
}

/**
 * Sends an error message when invalid arguments are found.
 *
 * @param {Object} msg Message object.
 */
const errorInvalidArgument = (msg) => {
  common.sendEmbed(msg, `**Error:** Missing or invalid arguments.
    Please, use correct syntax or type \`${process.env.PREFIX}help track\` for details.`)
}

/**
 * Checks whether a show already exists in the database.
 *
 * @param {string} showArgument A show name string.
 * @returns {Promise} `true` if show is found, `false` otherwise.
 */
const showAlreadyExists = (showArgument) => {
  return new Promise((resolve, reject) => {
    let showFound = false

    pg.trackShowGetAll().then(showArray => {
      showArray.forEach(show => {
        if (show.show_name.toLowerCase() === showArgument.toLowerCase()) {
          showFound = true
        }
      })

      resolve(showFound)
    }).catch(err => reject(new Error(err)))
  })
}

/**
 * Handles track command when user tries to get info for a specific show.
 *
 * @param {Object} msg Message object.
 * @param {string} msg Show string that is being checked.
 */
const argumentUnknown = (msg, showSearch) => {
  let showFound = ''
  // If unknown arg, check if it matches a show name and if so return that, if not show error.
  pg.trackShowGetAll().then((showArray) => {
    showArray.forEach(show => {
      if (show.show_slug === showSearch.toLowerCase()) {
        showFound = show
      }
    })

    if (showFound) {
      // Show data on Discord.
      common.sendEmbed(msg, `**${showFound.show_name}:** ${showFound.episode} Eps watched.`)
    } else {
      errorShowNotFound(msg)
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

/**
 * Handles track command when the user wants to list all tracked shows.
 *
 * @param {Object} msg Message object.
 * @param {Object} args Array of arguments.
 */
const argumentList = (msg, complete = false) => {
  pg.trackShowGetAll().then((showArray) => {
    // Sort shows by modification date.
    showArray = showArray.sort((a, b) => (a.modified > b.modified) ? 1 : -1)

    // Filter completed shows accordingly.
    if (complete) {
      showArray = showArray.filter(show => show.complete === true)
    } else {
      showArray = showArray.filter(show => show.complete === false)
    }

    // Build output.
    let message = ''
    if (complete) {
      message = '**Completed Shows:**\n'
    } else {
      message = '**Tracked Shows:**\n'
    }

    showArray.forEach(show => {
      message = message + `- **${show.show_name}** (${show.episode} Eps watched)\n`
    })

    // Show data on Discord.
    common.sendEmbed(msg, message)
  }).catch(err => common.sendErrorMsg(msg, err))
}

/**
 * Handles track command when the user wants to add a tracked show.
 * It allows providing an optional episode count.
 *
 * @param {Object} msg Message object.
 * @param {Object} msg Arguments array (show name, optional episode count).
 */
const argumentAdd = (msg, args) => {
  const showArgument = args[0]
  const showArgumentSlug = showArgument.toLowerCase()
  let episode = 0

  // Make sure that the provided show name isn't in the database already.
  showAlreadyExists(showArgument).then(exists => {
    if (exists) {
      errorShowAlreadyExists(msg)
    } else {
      let description = `**${showArgument}** has been added to the tracked shows list!`

      // Check if a number of eps is provided and is a valid integer.
      if (args[1] && Number.isInteger(Number.parseInt(args[1]))) {
        episode = Number.parseInt(args[1])
        description = `**${showArgument}** has been added to the tracked shows list with **${episode}** episodes watched!`
      }

      // Add to database.
      pg.trackShowAdd(showArgument, showArgumentSlug, episode, msg.author.id, moment().format('x')).then((res) => {
        if (res.rowCount > 0) {
          common.sendEmbed(msg, description)
        } else {
          common.sendErrorMsg(msg, 'Something went wrong, please try again!')
        }
      }).catch(err => common.sendErrorMsg(msg, err))
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

/**
 * Handles track command when the user wants to renamee a tracked show.
 *
 * @param {Object} msg Message object.
 * @param {Object} args Array of arguments (show name, episode count).
 */
const argumentRename = (msg, args) => {
  // Parse args.
  const showSlugOld = args[0].toLowerCase()
  const showNameNew = args[1]
  const showSlugNew = args[1].toLowerCase()

  // Rename show in database.
  pg.trackShowRename(showSlugOld, showNameNew, showSlugNew).then((res) => {
    if (res) {
      pg.trackShowGet(showSlugNew).then((show) => {
        common.sendEmbed(msg, `**${showSlugOld}** has been renamed to **${showNameNew}**.`)
      }).catch(err => common.sendErrorMsg(msg, err))
    } else {
      common.sendErrorMsg(msg, 'Something went wrong.\nAre you sure that show exists in the list?')
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

/**
 * Handles track command when the user wants to update a tracked show with
 * a new watched episode count.
 *
 * @param {Object} msg Message object.
 * @param {Object} args Array of arguments (show name, episode count).
 */
const argumentSet = (msg, args) => {
  // Get show name & slug.
  const show = args[0]
  const showSlug = show.toLowerCase()

  // Get number of eps.
  const episode = Number.parseInt(args[1])
  if (!Number.isInteger(episode)) {
    return errorInvalidArgument(msg)
  }

  // Make sure that the provided show name exists.
  showAlreadyExists(show).then(exists => {
    if (exists) {
      // Add to database.
      pg.trackShowSet(show, showSlug, episode, moment().format('x'), msg.author.id).then((res) => {
        if (res.rowCount > 0) {
          pg.trackShowGet(showSlug).then((show) => {
            common.sendEmbed(msg, `Updating **${show.show_name}**: **${show.episode}** episodes watched.`)
          }).catch(err => common.sendErrorMsg(msg, err))
        } else {
          common.sendErrorMsg(msg, 'Something went wrong, please try again!')
        }
      }).catch(err => common.sendErrorMsg(msg, err))
    } else {
      errorShowNotFound(msg)
    }
  })
}

/**
 * Handles track command when the user wants to delete a show from  the database.
 *
 * @param {Object} msg Message object.
 * @param {string} msg Argument array with show name.
 */
const argumentDelete = (msg, args) => {
  // Get show slug.
  const showArgument = args[0].toLowerCase()

  // Delete tracked show from db.
  pg.trackShowGet(showArgument).then((show) => {
    if (show) {
      pg.trackShowDelete(showArgument).then((res) => {
        common.sendEmbed(msg, `${common.displayName(msg)}, **${show.show_name}** (${show.episode} eps watched) has been removed from the tracked shows list.`)
      }).catch(err => common.sendErrorMsg(msg, err))
    } else {
      errorShowNotFound(msg)
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

/**
 * Handles track command when the user wants to set a show as completed.
 *
 * @param {Object} msg Message object.
 * @param {string} msg Argument array with show name.
 */
const argumentComplete = (msg, args) => {
  if (args[0]) {
    // Get show slug.
    const showSlug = args[0].toLowerCase()

    // If show is specified, toggle completed state.
    pg.trackShowGet(showSlug).then((show) => {
      if (show) {
        const complete = !show.complete

        pg.trackShowSetComplete(show.show_name, showSlug, show.episode, show.modified, show.userid, complete).then((res) => {
          if (res.rowCount > 0) {
            if (complete) {
              common.sendEmbed(msg, `Marking **${show.show_name}** as completed.`)
            } else {
              common.sendEmbed(msg, `Marking **${show.show_name}** as watching.`)
            }
            // pg.trackShowGet(showSlug).then((show) => {
            //   common.sendEmbed(msg, `Marking **${show.show_name}** as completed.`)
            // }).catch(err => common.sendErrorMsg(msg, err))
          } else {
            common.sendErrorMsg(msg, 'Something went wrong, please try again!')
          }
        }).catch(err => common.sendErrorMsg(msg, err))
      } else {
        errorShowNotFound(msg)
      }
    }).catch(err => common.sendErrorMsg(msg, err))
  } else {
    // If no show is specified, show a list of completed shows.
    argumentList(msg, true)
  }
}

const run = (client, msg, args) => {
  // No arguments found, so just show list of tracked shows.
  if (Array.isArray(args) && !args.length) {
    return argumentList(msg)
  }

  // Disallow editing in DMs, otherwise a malicious user could
  // privately delete or change the data.
  if (msg.channel.type === 'dm') {
    return errorNoDms(msg)
  }

  // Arguments found, check what the user wants to do.
  const action = args.shift()

  if (action === 'add') {
    argumentAdd(msg, args)
  } else if (action === 'rename' || action === 'ren') {
    argumentRename(msg, args)
  } else if (action === 'set' || action === 'update') {
    argumentSet(msg, args)
  } else if (action === 'delete' || action === 'del') {
    argumentDelete(msg, args)
  } else if (action === 'complete' || action === 'completed' || action === 'done' || action === 'finish' || action === 'finished') {
    argumentComplete(msg, args)
  } else {
    // User might be trying to check ep count for a show, check for that.
    argumentUnknown(msg, action)
  }
}

module.exports = {
  name: 'track',
  desc: 'Keeps track of how many episodes have been watched for a show. You can check usage and examples below for how to add new tracked shows, rename, change, check the amount of episodes watched, or delete them from the database.\n\nWhen providing a show name, capitalization is ignored, so `HxH` and `hxh` will work just the same. Show names can\'t contain spaces and should be short an easy to remember, so acronyms and similar short names are recommended.\n\nTo see a list of shows currently tracked type the command without any arguments.\n\nShows can also be marked as complete, which makes them appear in a separate list.',
  aliases: ['trackshow', 'ts'],
  usage: 'track [(show)|add (show)|rename (show) (newShowName)|set (show) (eps)|del (show)|complete (show)]',
  examples: ['track', 'track complete', 'track HxH', 'track add HxH', 'track rename Hunter HxH', 'track set HxH 120', 'track del HxH', 'track complete HxH'],
  run
}
