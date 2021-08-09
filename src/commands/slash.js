const common = require('../utils/common')

const run = async (client, msg, args) => {
  // Prevent missuse of this command.
  if (msg.author.id !== '174509303615586304') return

  // Get args.
  const input = args.shift()
  const commandScope = args.shift()
  const guild = commandScope ? process.env.GUILD_ID : null

  if (!input) {
    console.log('No command given.')
  } else {
    // Get command and slash command data.
    let command
    if (client.commands.has(input)) {
      command = await client.commands.get(input)
    } else {
      return common.sendEmbed(msg, 'Command not found in enmap!')
    }

    // Store the slash command data in array.
    const data = {
      name: command.name,
      description: command.slash_command.description,
      options: command.slash_command.options
    }

    // Register slash command.
    if (guild) {
      const slash = await client.guilds.cache.get(guild)?.commands.create(data)
      console.log(slash)
      common.sendEmbed(msg, 'Command should be added now to this guild, check logs for details!')
    } else {
      const slash = await client.application?.commands.create(data)
      console.log(slash)
      common.sendEmbed(msg, 'Command should be added globally in a while, check logs for details!')
    }
  }
}

module.exports = {
  name: 'slash',
  desc: 'Registers a slash command.',
  usage: 'slash',
  skipDocs: true,
  run
}
