const common = require('../utils/common')

const run = (client, msg, args) => {
  // If and argument is provided, check if it matches a command and show specific help.
  if (args.length > 0) {
    // Grab the command data from the client.commands Enmap.
    const query = args[0]
    const cmd = client.commands.get(query) ||
      client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(query))

    // If command isn't found send an error message to the user and stop here.
    if (!cmd) {
      const emoteAngry = common.getCustomEmote(client, 'Angry', '😡')
      return msg.channel.send({
        embed: {
          color: 0x82170F,
          description: `${emoteAngry} **REEE!** Can't find any command by that name, did you spell that wrong? Try typing just \`${process.env.PREFIX}help\` for more details.`
        }
      })
    }

    // Build command details strings.
    const name = `${process.env.PREFIX}${cmd.name}`
    const desc = `${cmd.desc}`
    const usage = `\`${process.env.PREFIX}${cmd.usage}\``

    // Prepare fields array for embed message.
    const fields = [
      {
        name: 'Command description',
        value: desc
      },
      {
        name: 'Usage',
        value: usage
      }
    ]

    // Only show the examples section if any are found.
    if (cmd.examples) {
      const exampleArray = cmd.examples.map((element) => {
        return `\`${process.env.PREFIX}${element}\``
      })
      const examples = exampleArray.join(' ')
      fields.push(
        {
          name: 'Examples',
          value: examples
        })
    }

    // Only show the aliases section if any are found.
    if (cmd.aliases) {
      const aliasesArray = cmd.aliases.map((element) => {
        return `\`${process.env.PREFIX}${element}\``
      })
      const aliases = aliasesArray.join(' ')
      fields.push(
        {
          name: 'Aliases',
          value: aliases
        }
      )
    }

    // Send an embed message with help about the requested command.
    msg.channel.send({
      embed: {
        color: 3447003,
        title: name,
        fields
      }
    })
  } else {
    // Send general documentation link in a nice and clean embed.
    msg.channel.send({
      embed: {
        color: 3447003,
        title: 'KoreanLady Commands',
        url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/COMMANDS.md#koreanlady-discord-bot',
        description: 'Here you will find all commands available and their usage!',
        footer: {
          text: 'Tip: You can also DM me to test commands!'
        }
      }
    })
  }
}

module.exports = {
  name: 'help',
  desc: 'Shows a link to command list in documentation. If a command is added as an argument, it will show help specific to that command.',
  aliases: ['h', '?'],
  usage: 'help [command]',
  examples: ['help', 'help ban'],
  run
}
