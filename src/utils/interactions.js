
const { DiscordInteractions } = require('slash-commands')
const interaction = new DiscordInteractions({
  applicationId: process.env.DISCORD_APPID,
  authToken: process.env.DISCORD_TOKEN,
  publicKey: process.env.DISCORD_PUBKEY
})

// const getAll = () => {
//   return new Promise((resolve, reject) => {
//   interaction
//     .getApplicationCommands(process.env.GUILD_ID)
//     .then((commands) => {
//       resolve(commands)
//     })
//     .catch((err) => {
//       reject(err)
//     })
//   })
// }

const createAll = (commands) => {
  return new Promise((resolve, reject) => {
    interaction
      .getApplicationCommands(process.env.GUILD_ID)
      .then((commands) => {
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
      .catch((err) => {
        reject(err)
      })
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
