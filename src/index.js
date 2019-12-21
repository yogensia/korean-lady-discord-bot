require('dotenv').config()

const { Client } = require('discord.js')
const Enmap      = require('enmap')
const fs         = require("fs")

const client    = new Client()
client.commands = new Enmap()

// Environment variables.
client.env = {}
client.env.prefix = process.env.PREFIX

/**
 * Ready event.
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  // Set bot status and presence.
  client.user.setStatus('available')
  client.user.setPresence({
    game: {
      name: `${client.env.prefix}help`,
      type: "PLAYING"
    }
  })
})

/**
 * Load events.
 */
fs.readdir('./src/events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    // Load the event file itself.
    const event = require(`./events/${file}`)
    // Get just the event name from the file name.
    let eventName = file.split(".")[0]
    // Call events with all their proper arguments *after* the `client` var.
    client.on(eventName, event.bind(null, client))
  })
})

/**
 * Load Commands.
 */
fs.readdir('./src/commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    // Load the command file itself.
    let props = require(`./commands/${file}`)
    // Get just the command name from the filename.
    let commandName = file.split('.')[0]
    console.log(`Attempting to load command ${commandName}`)
    // Store in the command Enmap.
    client.commands.set(commandName, props)
  })
})

/**
 * Login to Discord.
 */
client.login()
