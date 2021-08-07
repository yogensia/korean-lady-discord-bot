const common = require('../utils/common')

/**
 * Parses an array and adds it to a field object for use in an embed.
 *
 * @param {array} array Array of strings to add to the field object.
 * @param {string} name Name of the field in the embed.
 * @param {array} fields Field object to add the array to.
 */
const addFields = (array, name, fields) => {
  if (array) {
    const mappedArray = array.map((element) => {
      return `\`${process.env.PREFIX}${element}\``
    })
    const value = mappedArray.join(' ')
    fields.push({
      name,
      value
    })
  }
}

const construct = (client, msg, args) => {
  let data = {}
  // If and argument is provided, check if it matches a command and show specific help.
  if (args.length > 0) {
    // Grab the command data from the client.commands Enmap.
    const query = args[0]
    const cmd = client.commands.get(query) ||
      client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(query))

    // If command isn't found send an error message to the user and stop here.
    if (!cmd) {
      return common.sendErrorMsg(msg, `Can't find any command by that name, did you spell that wrong? Try typing \`${process.env.PREFIX}help\` for more details.`)
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
    addFields(cmd.examples, 'Examples', fields)

    // Only show the aliases section if any are found.
    addFields(cmd.aliases, 'Aliases', fields)

    // Send an embed message with help about the requested command.
    data = {
      color: 3447003,
      title: name,
      fields
    }
  } else if (msg.channel.type === 'dm') {
    // Send general documentation link in a nice and clean embed.
    data = {
      color: 3447003,
      title: 'Full KoreanLady Command List',
      url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/COMMANDS.md#readme',
      description: `**Hello ${common.displayName(msg)}!** KoreanLady is a simple Discord bot with a few fun commands and no moderation or any other advanced functions.`,
      fields: [
        {
          name: 'Prefix',
          value: `The prefix for KoreanLady's commands is: \`${process.env.PREFIX}\`\n(The prefix can be omitted in this DM conversation)`
        },
        {
          name: 'Command list',
          value: `To see all available commands, please check the link above, or type \`${process.env.PREFIX}list\``
        },
        {
          name: 'Testing commands',
          value: 'You can use this DM conversation to test commands privately all you want.'
        },
        {
          name: 'The \'help\' command',
          value: `You can type \`${process.env.PREFIX}help\` followed by another command's name to get more info and usage examples on that command.`
        },
        {
          name: 'Missing parameters',
          value: 'Some commands require a parameter, like a question, name, object... If you don\'t include it, an error message will show up letting you know and providing examples.'
        },
        {
          name: 'Cookie',
          value: 'Thanks for reading, have a cookie! 🍪'
        }
      ]
    }
  } else {
    // Send general documentation link in a nice and clean embed.
    data = {
      color: 3447003,
      title: 'KoreanLady Commands',
      url: 'https://github.com/yogensia/korean-lady-discord-bot/blob/master/COMMANDS.md#readme',
      description: 'Here you will find all commands available and their usage!',
      footer: {
        text: 'Tip: You can also DM me and type `help` for more info!'
      }
    }
  }

  return data
}

const slash = async (client, msg, interaction, args) => {
  // Reply with an embed message.
  await interaction.reply({
    embeds: [await construct(client, msg, args)],
    ephemeral: true
  })
}

const run = async (client, msg, args) => {
  // Reply with an embed message.
  common.sendEmbedObject(msg, await construct(client, msg, args))
}

module.exports = {
  name: 'help',
  desc: 'Shows a link to command list in documentation. If a command is added as an argument, it will show help specific to that command.',
  aliases: ['h', '?', 'info'],
  usage: 'help [command]',
  examples: ['help', 'help ban'],
  slash_command: {
    description: 'Provides help about how to use this bot',
    options: [
      {
        name: 'command',
        value: 'command',
        description: 'Command that you want to learn about',
        type: 3,
        required: false
      }
    ]
  },
  slash,
  run
}
