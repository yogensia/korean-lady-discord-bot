module.exports = (client, message) => {
  // Ignore bot messages.
  if (message.author.bot) return

  // Ignore messages not starting with the prefix.
  if (message.content.indexOf(process.env.prefix) !== 0) return

  // Our standard argument/command name definition.
  const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  // Grab the command data from the client.commands Enmap.
  const cmd = client.commands.get(command)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

  // If that command doesn't exist, silently exit and do nothing.
  if (!cmd) return

  // Store command details in client object for later use.
  client.cmd = cmd

  // Run the command.
  cmd.run(client, message, args)
}
