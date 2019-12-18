const { Client } = require('discord.js')
const commands = require('./commands')

const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

/**
 * Listen for commands.
 */
client.on('message', msg => {
  commands.add(msg)
})

/**
 * Login to Discord.
 */
client.login('YOUR_TOKEN_GOES_HERE')
