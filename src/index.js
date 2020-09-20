require('dotenv').config()

const { Client } = require('discord.js')
const Enmap = require('enmap')
const fs = require('fs')

const client = new Client()
client.commands = new Enmap()
client.strings = new Enmap()

/**
 * Ready event.
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  // Set bot status and presence.
  client.user.setStatus('available')
  client.user.setPresence({
    activity: {
      name: `${process.env.PREFIX}help`,
      type: 'PLAYING'
    }
  })

  // Get spam channel object.
  client.channels.fetch(process.env.SPAM_CHANNEL_ID)
    .then(channel => {
      client.spamChannel = channel
    })
    .catch(console.error)
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
    const eventName = file.split('.')[0]

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
    const props = require(`./commands/${file}`)

    // Get just the command name from the filename.
    const commandName = file.split('.')[0]
    console.log(`Loading command '${commandName}'`)

    // Store in the command Enmap.
    client.commands.set(commandName, props)
  })
})

/**
 * Load string responders.
 */
fs.readdir('./src/strings/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return

    // Load the string responder file itself.
    const props = require(`./strings/${file}`)

    // Get the string name from the filename.
    const stringName = file.split('.')[0]
    console.log(`Loading string responder '${stringName}'`)

    // Store in the string responders Enmap.
    client.strings.set(stringName, props)
  })
})

/**
 * Load cron jobs.
 */
fs.readdir('./src/jobs/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return

    // Load the string responder file itself.
    const props = require(`./jobs/${file}`)

    // Get the cron job name from the filename.
    const stringName = file.split('.')[0]
    console.log(`Loading cron job '${stringName}'`)

    // Run Cron Job.
    props.run(client)
  })
})

/**
 * Login to Discord.
 */
client.login()
