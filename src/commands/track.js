const common = require('../utils/common')
const moment = require('moment-timezone')
const pg = require('../utils/pg')

/**
 * Returns an error message when a show already exists.
 * @returns {string} Error string.
 */
const errorShowAlreadyExists = () => {
  return `**Error:** A show with that name already exists in the database.
    To update it, please use the \`/track edit\` command.`
}

/**
 * Returns an error message when a show is not found.
 * @returns {string} Error string.
 */
const errorShowNotFound = () => {
  return `**Error:** I couldn't find any tracked shows by that name.
    Try the \`/track check\` command to see shows currently being tracked.`
}

/**
 * Returns an error message when a user attempts to use the command in a DM.
 * @returns {string} Error string.
 */
const errorNoDms = () => {
  return '**Error:** Sorry, for security reasons, this command is read-only in DMs.'
}

/**
 * Returns an error message when invalid arguments are found.
 * @returns {string} Error string.
 */
const errorInvalidArgument = () => {
  return `**Error:** Missing or invalid arguments.
    Please, use correct syntax or type \`${process.env.PREFIX}help track\` for details.`
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
 * Handles track command when the user wants to list all tracked shows.
 *
 * @param {Object} interaction Interaction object.
 * @param {Object} args Array of arguments.
 */
const argumentList = (interaction, args, complete = false) => {
  // If we are requesting a specific show, show that alone, otherwise dump tracked shows list.
  if (args && args[0].name === 'name') {
    const showSearch = args[0].value
    let showFound = ''

    return pg.trackShowGetAll().then((showArray) => {
      showArray.forEach(show => {
        if (show.show_slug === showSearch.toLowerCase()) {
          showFound = show
        }
      })

      if (showFound) {
        // Show data on Discord.
        common.interactionReply(interaction, `**${showFound.show_name}** (${showFound.episode} Eps watched)`)
      } else {
        common.interactionReply(interaction, errorShowNotFound(), true)
      }
    }).catch(err => console.log(err))
  } else {
    return pg.trackShowGetAll().then((showArray) => {
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
      common.interactionReply(interaction, message)
    }).catch(err => console.log(err))
  }
}

/**
 * Handles track command when the user wants to add a tracked show.
 * It allows providing an optional episode count.
 *
 * @param {Object} interaction Interaction object.
 * @param {Object} interaction Arguments array (show name, optional episode count).
 */
const argumentAdd = (interaction, args) => {
  const showArgument = args[0].value
  const showArgumentSlug = showArgument.toLowerCase()
  let episode = 0

  // Make sure that the provided show name isn't in the database already.
  return showAlreadyExists(showArgument).then(exists => {
    if (exists) {
      common.interactionReply(interaction, errorShowAlreadyExists(), true)
    } else {
      let description = `**${showArgument}** has been added to the tracked shows list!`

      // Check if a number of eps is provided and is a valid integer.
      if (args[1] && Number.isInteger(Number.parseInt(args[1].value))) {
        episode = Number.parseInt(args[1].value)
        description = `**${showArgument}** has been added to the tracked shows list with **${episode}** episodes watched!`
      }

      // Add to database.
      pg.trackShowAdd(showArgument, showArgumentSlug, episode, interaction.user.id, moment().format('x')).then((res) => {
        if (res.rowCount > 0) {
          common.interactionReply(interaction, description)
        } else {
          common.interactionReply(interaction, 'Something went wrong, please try again!', true)
        }
      }).catch(err => console.log(err))
    }
  }).catch(err => console.log(err))
}

/**
 * Handles track command when the user wants to renamee a tracked show.
 *
 * @param {Object} interaction Interaction object.
 * @param {Object} args Array of arguments (show name, episode count).
 */
const argumentRename = (interaction, args) => {
  // Parse args.
  const showSlugOld = args[0].value.toLowerCase()
  const showNameNew = args[1].value
  const showSlugNew = args[1].value.toLowerCase()

  // Rename show in database.
  pg.trackShowRename(showSlugOld, showNameNew, showSlugNew).then((res) => {
    if (res) {
      pg.trackShowGet(showSlugNew).then((show) => {
        common.interactionReply(interaction, `**${showSlugOld}** has been renamed to **${showNameNew}**.`)
      }).catch(err => console.log(err))
    } else {
      common.interactionReply(interaction, 'Something went wrong.\nAre you sure that show exists in the list?', true)
    }
  }).catch(err => console.log(err))
}

/**
 * Handles track command when the user wants to update a tracked show with
 * a new watched episode count.
 *
 * @param {Object} interaction Interaction object.
 * @param {Object} args Array of arguments (show name, episode count).
 */
const argumentSet = (interaction, args) => {
  // Get show name & slug.
  const show = args[0].value
  const showSlug = show.toLowerCase()

  // Get number of eps.
  const episode = Number.parseInt(args[1].value)
  if (!Number.isInteger(episode)) {
    common.interactionReply(interaction, errorInvalidArgument(), true)
  }

  // Make sure that the provided show name exists.
  showAlreadyExists(show).then(exists => {
    if (exists) {
      // Add to database.
      pg.trackShowSet(show, showSlug, episode, moment().format('x'), interaction.user.id).then((res) => {
        if (res.rowCount > 0) {
          pg.trackShowGet(showSlug).then((show) => {
            common.interactionReply(interaction, `Updating **${show.show_name}**: **${show.episode}** episodes watched.`)
          }).catch(err => console.log(err))
        } else {
          common.interactionReply(interaction, 'Something went wrong, please try again!', true)
        }
      }).catch(err => console.log(err))
    } else {
      common.interactionReply(interaction, errorShowNotFound(), true)
    }
  })
}

/**
 * Handles track command when the user wants to delete a show from  the database.
 *
 * @param {Object} interaction Interaction object.
 * @param {string} msg Argument array with show name.
 */
const argumentDelete = (interaction, args) => {
  // Get show slug.
  const showArgument = args[0].value.toLowerCase()

  // Delete tracked show from db.
  pg.trackShowGet(showArgument).then((show) => {
    if (show) {
      pg.trackShowDelete(showArgument).then((res) => {
        common.interactionReply(interaction, `${common.displayName(interaction)}, **${show.show_name}** (${show.episode} eps watched) has been removed from the tracked shows list.`)
      }).catch(err => console.log(err))
    } else {
      common.interactionReply(interaction, errorShowNotFound(), true)
    }
  }).catch(err => console.log(err))
}

/**
 * Handles track command when the user wants to set a show as completed.
 *
 * @param {Object} interaction Interaction object.
 * @param {string} msg Argument array with show name.
 */
const argumentComplete = (interaction, args) => {
  if (args[0]) {
    // Get show slug.
    const showSlug = args[0].value.toLowerCase()

    // If show is specified, toggle completed state.
    pg.trackShowGet(showSlug).then((show) => {
      if (show) {
        const complete = !show.complete

        pg.trackShowSetComplete(show.show_name, showSlug, show.episode, show.modified, show.userid, complete).then((res) => {
          if (res.rowCount > 0) {
            if (complete) {
              common.interactionReply(interaction, `Marking **${show.show_name}** as completed.`)
            } else {
              common.interactionReply(interaction, `Marking **${show.show_name}** as watching.`)
            }
          } else {
            common.interactionReply(interaction, 'Something went wrong, please try again!', true)
          }
        }).catch(err => console.log(err))
      } else {
        common.interactionReply(interaction, errorShowNotFound(), true)
      }
    }).catch(err => console.log(err))
  } else {
    // If no show is specified, show a list of completed shows.
    argumentList(interaction, true)
  }
}

const slash = async (client, msg, interaction) => {
  // Disallow editing in DMs, otherwise a malicious user could
  // privately delete or change the data.
  if (msg.channel.type === 'dm') {
    common.interactionReply(interaction, errorNoDms(), true)
  }

  // Get array of actions.
  const actions = []
  interaction.options.data.forEach(option => {
    actions.push(option.name)
  })

  // Check for main action to perform.
  const action = actions.shift()

  // Get arguments.
  const args = interaction.options.data[0].options

  if (action === 'list') {
    argumentList(interaction, args)
  } else if (action === 'archived') {
    argumentList(interaction, args, true)
  } else if (action === 'add') {
    argumentAdd(interaction, args)
  } else if (action === 'edit') {
    argumentSet(interaction, args)
  } else if (action === 'rename') {
    argumentRename(interaction, args)
  } else if (action === 'complete') {
    argumentComplete(interaction, args)
  } else if (action === 'delete') {
    argumentDelete(interaction, args)
  }
}

module.exports = {
  name: 'track',
  desc: 'Keeps track of how many episodes have been watched for a show. You can check usage and examples below for how to add new tracked shows, rename, change, check the amount of episodes watched, or delete them from the database.\n\nWhen providing a show name, capitalization is ignored, so `HxH` and `hxh` will work just the same. Show names can\'t contain spaces and should be short an easy to remember, so acronyms and similar short names are recommended.\n\nTo see a list of shows currently tracked type the command without any arguments.\n\nShows can also be marked as complete, which makes them appear in a separate list.',
  aliases: ['trackshow', 'ts'],
  usage: 'track [(show)|add (show)|rename (show) (newShowName)|set (show) (eps)|del (show)|complete (show)]',
  examples: ['track', 'track complete', 'track HxH', 'track add HxH', 'track rename Hunter HxH', 'track set HxH 120', 'track del HxH', 'track complete HxH'],
  slash_command: {
    description: 'Keeps track of episodes watched for shows',
    options: [
      {
        name: 'list',
        description: 'List tracked shows and their watched eps',
        type: 1,
        options: [
          {
            name: 'name',
            description: 'Show name (ignores letter casing)',
            type: 3,
            required: false
          }
        ]
      },
      {
        name: 'archived',
        description: 'List shows that have been completed/archived',
        type: 1,
        options: [
          {
            name: 'name',
            description: 'Show\'s name (ignores letter casing)',
            type: 3,
            required: false
          }
        ]
      },
      {
        name: 'add',
        description: 'Adds a new show to be tracked',
        type: 1,
        options: [
          {
            name: 'name',
            description: 'Show name',
            type: 3,
            required: true
          },
          {
            name: 'eps',
            description: 'Episodes watched',
            type: 4,
            required: false
          }
        ]
      },
      {
        name: 'edit',
        description: 'Changes number of episodes watched for a tracked show',
        type: 1,
        options: [
          {
            name: 'name',
            description: 'Show name (ignores letter casing)',
            type: 3,
            required: true
          },
          {
            name: 'eps',
            description: 'Episodes watched',
            type: 4,
            required: true
          }
        ]
      },
      {
        name: 'rename',
        description: 'Renames a tracked show',
        type: 1,
        options: [
          {
            name: 'name',
            description: 'Show\'s current name',
            type: 3,
            required: true
          },
          {
            name: 'new_name',
            description: 'Show\'s new name',
            type: 3,
            required: true
          }
        ]
      },
      {
        name: 'complete',
        description: 'Toggles a tracked show between complete/active',
        type: 1,
        options: [
          {
            name: 'name',
            description: 'Show\'s name (ignores letter casing)',
            type: 3,
            required: true
          }
        ]
      },
      {
        name: 'delete',
        description: 'Deletes a tracked show (this cannot be undone!)',
        type: 1,
        options: [
          {
            name: 'name',
            description: 'Show\'s name (ignores letter casing)',
            type: 3,
            required: true
          }
        ]
      }
    ]
  },
  slash
}
