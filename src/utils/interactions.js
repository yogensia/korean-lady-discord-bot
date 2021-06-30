
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

const getAll = (command) => {
  return interaction
    .getApplicationCommands(process.env.GUILD_ID)
    .catch(console.error)
}

const createAll = (commands) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]

      interaction
        .createApplicationCommand(command, process.env.GUILD_ID)
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

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    interaction
      .getApplicationCommands(process.env.GUILD_ID)
      .then(async (commands) => {
        for (let i = 0; i < commands.length; i++) {
          const command = commands[i]
          await interaction
            .deleteApplicationCommand(command, process.env.GUILD_ID)
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

const createCommand = (command) => {
  return new Promise((resolve, reject) => {
    interaction
      .createApplicationCommand(command, process.env.GUILD_ID)
      .then((command) => {
        console.log('Registering slash command:', command.name)
        resolve(command)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const deleteCommand = (command) => {
  return new Promise((resolve, reject) => {
    interaction
      .deleteApplicationCommand(command, process.env.GUILD_ID)
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
