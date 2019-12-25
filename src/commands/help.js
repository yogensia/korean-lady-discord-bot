const common = require('../utils/common')

const run = (client, msg, args) => {
  // If and argument is provided, check if it matches a command and show specific help.
  if (args.length > 0) {
    // Grab the command data from the client.commands Enmap.
    const query = args[0]
    const cmd = client.commands.get(query)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(query))

    // If command isn't found send an error message to the user and stop here.
    if (null === cmd) {
      const emote_angry = common.getCustomEmote(client, 'Angry', 'rage')
      return msg.channel.send(`${emote_angry} **REEE!** Can't find any command by that name, did you spell that wrong?\nTry typing just \`${client.env.prefix}help\` for more details.`)
    }

    // Build command details strings.
    let name          = `${client.env.prefix}${cmd.name}`
    let desc          = `${cmd.desc}`
    let usage         = `\`${client.env.prefix}${cmd.usage}\``
    let example_array = cmd.examples.map(function(element) {
      return `\`${client.env.prefix}${element}\``
    })
    let examples = example_array.join(' ')

    // Prepare fields array for embed message.
    let fields = [
      {
        name: 'Usage',
        value: usage,
      },
      {
        name: 'Examples',
        value: examples,
      }
    ]

    // Only show the aliases section if any are found.
    let aliases
    if (null == cmd.aliases) {
      aliases = ''
    } else {
      aliases = cmd.aliases.map(function(element) {
        return `\`${client.env.prefix}${element}\``
      })
      aliases = aliases.join(' ')
      fields.push(
        {
          name: 'Aliases',
          value: aliases,
        }
      )
    }

    // Send an embed message with help about the requested command.
    msg.channel.send({
      embed: {
        color: 3447003,
        title: name,
        description: desc,
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
        description: 'Here you will find all commands available and their usage!\nYou can also DM me to test commands!'
      }
    })
  }
}

module.exports = {
  name: 'help',
  desc: 'Shows a link to command list in documentation. If a command is added as an argument, it will show help specific to that command.',
  aliases: ['h', '?'],
  usage: ['help [command]'],
  examples: ['help', 'help ban'],
  run
}
