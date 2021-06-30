// const common = require('../utils/common')
const interactions = require('../utils/interactions')

const run = async (client, msg, args) => {
  // Prevent missuse of this command.
  if (msg.author.id !== '174509303615586304') return

  // Get input from args.
  const input = args.join(' ')

  if (!input) {
    console.log('No command given.')
  } else {
    // Get command and slash command data.
    const command = await client.commands.get(input)

    // Store the slash command data in array.
    const data = {
      name: command.name,
      description: command.slash_command.description,
      options: command.slash_command.options
    }

    // Add command.
    interactions.createCommand(data)
      .then(console.log)
      .catch(console.error)
  }
}

module.exports = {
  name: 'deploy',
  desc: 'Deploys interactions for a given command.',
  usage: 'deploy',
  skipDocs: true,
  run
}
