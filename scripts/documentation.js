require('dotenv').config()

const fs = require('fs')
const commands = []
const prefix = process.env.PREFIX_DOCUMENTATION
let output = ''

/**
 * Read a command file and stores its content in an array.
 *
 * @param {string} file Path to a command file.
 */
const pushCommand = file => {
  // Check that it's a .js file and doesn't start with `_`.
  if (!file.endsWith('.js')) return
  if (file.startsWith('_')) return

  // Get just the command name from the filename.
  const commandName = file.split('.')[0]
  console.log('Fetching command:', commandName)

  // Load the command file itself.
  const props = require(`../src/commands/${file}`)

  commands.push(props)
}

/**
 * Parses a command and adds its data to the output variable.
 *
 * @param {Object} cmd A command object.
 */
const parseCommand = cmd => {
  // Skip command if necesary.
  if (cmd.skipDocs) return

  console.log('Processing command:', cmd.name)
  output += `### \`k!${cmd.name}\`\n\n`
  output += `${cmd.desc}\n\n`
  output += `Usage: \`${prefix}${cmd.usage}\`\n\n`

  // Parse examples if any.
  if (cmd.examples) {
    const exampleArray = cmd.examples.map((element) => {
      return `\`${prefix}${element}\``
    })
    const examples = exampleArray.join(' ')
    output += `Examples: ${examples}\n\n`
  }

  // Parse aliases if any.
  if (cmd.aliases) {
    const aliasesArray = cmd.aliases.map((element) => {
      return `\`${prefix}${element}\``
    })
    const aliases = aliasesArray.join(' ')
    output += `Aliases: ${aliases}\n\n`
  }

  // If command is marked as spam, add a notice.
  if (cmd.spam) {
    output += 'Notice: This command is considered spam and can only be used in the spam channel.\n\n'
  }
}

/**
 * Writes the documentation file using using a template file as a base.
 *
 * @param {string} templateFile - Path to a template markdown file.
 * @param {string} documentationFile - Path to the output documentation file.
 */
const writeDocumentation = () => {
  // Read template file.
  fs.readFile('./scripts/_COMMANDS.md', 'utf8', (err, data) => {
    if (err) return console.log(err)

    // Remove last two line breaks from the string and replace.
    output = output.slice(0, -2)
    output = data.replace(/\${COMMANDS}/g, output)

    // Write complete string to output file.
    fs.writeFile('./COMMANDS.md', output, err => {
      if (err) return console.log(err)

      console.log('Documentation file written!')
      process.exit(1)
    })
  })
}

/**
 * Builds command documentation by readding commands' properties,
 * formatting them and storing them in a markdown file.
 */
async function build () {
  fs.readdir('./src/commands', (err, files) => {
    if (err) return console.error(err)

    // Add commands found to the commands array.
    files.forEach(file => {
      pushCommand(file)
    })

    // Add each command found to the documentation string.
    commands.forEach(cmd => {
      parseCommand(cmd)
    })

    // Write Commands to file.
    writeDocumentation()
  })
}

module.exports = {
  build
}
