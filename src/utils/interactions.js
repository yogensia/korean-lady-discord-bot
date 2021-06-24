
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

const createAll = (commands) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]

      interaction
        .createApplicationCommand(command, process.env.GUILD_ID)
        .then((command) => {
          console.log('Registering slash command:', command.name)
        })
        .catch(console.error)
    }
    resolve(commands)
  })
}

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    interaction
      .getApplicationCommands(process.env.GUILD_ID)
      .then((commands) => {
        for (let i = 0; i < commands.length; i++) {
          const command = commands[i]
          interaction
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
  })
}

module.exports = {
  createAll,
  deleteAll
}
