require('dotenv').config()

const fs = require('fs')
const commands = []
const prefix = process.env.PREFIX_DOCUMENTATION

async function generateDocs () {
  await fs.readdir('./src/commands', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
      // Check that it's a .js file and doesn't start with `_`
      if (!file.endsWith('.js')) return
      if (file.startsWith('_')) return

      // Get just the command name from the filename.
      const commandName = file.split('.')[0]
      console.log('Fetching command:', commandName)

      // Load the command file itself.
      const props = require(`../src/commands/${file}`)

      commands.push(props)
    })

    // Add each command found to the documentation string.
    let output = ''
    commands.forEach(cmd => {
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
    })

    // Read template file.
    fs.readFile('./scripts/COMMANDS.md', 'utf8', (err, data) => {
      if (err) return console.log(err)

      // Remove last two line breaks from the string and replace.
      output = output.slice(0, -2)
      output = data.replace(/\${COMMANDS}/g, output)

      // Write complete string to output file.
      fs.writeFile('./COMMANDS.md', output, err => {
        if (err) return console.log(err)

        console.log('The file was saved!')
      })
    })
  })
}

// Run.
generateDocs()
