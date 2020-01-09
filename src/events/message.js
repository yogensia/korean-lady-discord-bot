const common = require('../utils/common')

module.exports = (client, msg) => {
  // Ignore bot messages.
  if (msg.author.bot) return

  // Ignore messages not starting with the prefix or mention of our bot.
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(process.env.PREFIX)})\\s*`)
  if (!prefixRegex.test(msg.content)) return

  // Command & argument definition.
  const [, matchedPrefix] = msg.content.match(prefixRegex)
  const args = msg.content.slice(matchedPrefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  // Grab the command data from the client.commands Enmap.
  const cmd = client.commands.get(command) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

  // If that command doesn't exist, silently exit and do nothing.
  if (!cmd) return

  // Store command details in client object for later use.
  client.cmd = cmd

  // Check for required arguments for this command and send error message if needed.
  if (cmd.args && !args.length) {
    return common.sendMissingParameterMsg(client, msg, cmd.args_error)
  }

  // Run the command.
  cmd.run(client, msg, args)
}
