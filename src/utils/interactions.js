
const { DiscordInteractions } = require('slash-commands')
const interaction = new DiscordInteractions({
  applicationId: process.env.DISCORD_APPID,
  authToken: process.env.DISCORD_TOKEN,
  publicKey: process.env.DISCORD_PUBKEY
})

// Slash command option type enum:
// https://discord.com/developers/docs/interactions/slash-commands#application-command-object-application-command-option-type
// --------------------
// SUB_COMMAND        1
// SUB_COMMAND_GROUP  2
// STRING             3
// INTEGER            4
// BOOLEAN            5
// USER               6
// CHANNEL            7
// ROLE               8
// MENTIONABLE        9

/**
 * Registers a slash command.
 *
 * @param {Object} command Data for the command to register.
 * @param {string} guildId Optional guild Id to register the command for, otherwise command will be registered globally.
 * @returns {Object} Command registration response object.
 */
const getAll = (command, guildId = null) => {
  return interaction
    .getApplicationCommands(guildId)
    .catch(console.error)
}

/**
 * Registers array of slash commands.
 *
 * @param {array} commands Array with data for the commands to register.
 * @param {string} guildId Optional guild Id to register the commands for, otherwise commands will be registered globally.
 * @returns {Promise} Command registration response object or error.
 */
const createAll = (commands, guildId = null) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]

      interaction
        .createApplicationCommand(command, guildId)
        .then((command) => {
          console.log('Registering slash command:', command.name)
        })
        .catch((err) => {
          reject(err)
        })
    }
    resolve(commands)
  })
}

/**
 * Deletes all slash commands.
 *
 * @param {string} guildId Optional guild Id to delete the command from, otherwise command will be deleted globally.
 * @returns {Promise} Command deletion confirmation or error.
 */
const deleteAll = (guildId = null) => {
  return new Promise((resolve, reject) => {
    interaction
      .getApplicationCommands(guildId)
      .then(async (commands) => {
        for (let i = 0; i < commands.length; i++) {
          const command = commands[i]
          await interaction
            .deleteApplicationCommand(command, guildId)
            .then((res) => {
              console.log('Deleting slash command:', command.name)
            })
            .catch((err) => {
              reject(err)
            })
        }
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * Registers a slash command.
 *
 * @param {Object} command Data for the command to register.
 * @param {string} guildId Optional guild Id to register the command for, otherwise command will be registered globally.
 * @returns {Promise} Command registration response object or error.
 */
const createCommand = (command, guildId = null) => {
  return new Promise((resolve, reject) => {
    interaction
      .createApplicationCommand(command, guildId)
      .then((command) => {
        console.log('Registering slash command:', command.name)
        resolve(command)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * Deletes a slash command.
 *
 * @param {Object} command Data for the command to delete.
 * @param {string} guildId Optional guild Id to delete the command from, otherwise command will be deleted globally.
 * @returns {Promise} Command deletion response object or error.
 */
const deleteCommand = (command, guildId = null) => {
  return new Promise((resolve, reject) => {
    interaction
      .deleteApplicationCommand(command, guildId)
      .then((res) => {
        console.log('Deleting slash command:', command.name)
        console.log(res)
        resolve(command)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  getAll,
  createAll,
  deleteAll,
  createCommand,
  deleteCommand
}
