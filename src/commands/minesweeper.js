const Minesweeper = require('discord.js-minesweeper')
const common = require('../utils/common')
const math = require('../utils/math')

// Emotes.
const emotes = [
  ['ratJAM', '💥'],
  ['michael', '💥'],
  ['MingLee', '💥'],
  ['grubBONK', '💥'],
  ['gnomed', '💥'],
  ['french', '💥'],
  ['drakeban', '💥'],
  ['Blobfish', '💥'],
  ['obiHi1', '💥']
]

const run = async (client, msg, args) => {
  // OG Minesweeper Dificulty table.
  // -----------------------------------
  // Level          Width  Height  Mines
  // Beginner           9       9     10
  // Intermediate      16      16     40
  // Expert            30      16     99

  // Dificulty table adjusted for wider msgs, less line spam.
  // -----------------------------------
  // Level          Width  Height  Mines
  // Beginner          10       8     10
  // Intermediate      12      10     24
  // Expert            15      10     50

  // Convert all args to lowercase to avoid false negatives.
  args = args.map(arg => arg.toLowerCase())

  const settings = {}
  if (args[0] && args[0] === 'easy') {
    settings.columns = 10
    settings.rows = 8
    settings.mines = 10
  } else if (args[0] && args[0] === 'hard') {
    settings.columns = 15
    settings.rows = 10
    settings.mines = 50
  } else {
    settings.columns = 11
    settings.rows = 10
    settings.mines = 24
  }

  let revealFirstCell = true
  if (args.includes('blank')) {
    revealFirstCell = false
  }

  // Random emote.
  let emote = math.getRandomStringFromArray(emotes, false)
  emote = common.getCustomEmote(client, emote[0], emote[1])

  // Minesweeper plugin.
  const minesweeper = new Minesweeper({
    columns: settings.columns,
    rows: settings.rows,
    mines: settings.mines,
    emote,
    revealFirstCell,
    spaces: true,
    returnType: 'emoji'
  })

  // Remove semicolons to make custom guild emotes work.
  const matrix = minesweeper.start()
    .replaceAll(':<', '<')
    .replaceAll('>:', '>')
    .replaceAll(':💥:', '💥')

  const introMsg = await msg.channel.send(`A pack of expertly trained rodents is preparing the board, please wait... ${common.getCustomEmote(client, 'ratJAM')}`)

  // Spit lines one by one to avoid exceeding 2000 character limit.
  const lines = matrix.split('\n')
  for (let i = 0; i < lines.length; i++) {
    await msg.channel.send(lines[i])
  }

  // Say goodbye!
  introMsg.edit(`All done, enjoy the game! ${common.getCustomEmote(client, 'peepoPants')}`).then(() => {
    setTimeout(() => {
      introMsg.delete()
    }, 2500)
  })
}

module.exports = {
  name: 'minesweeper',
  desc: 'Starts a game of minesweeper. You can set the difficulty by appending "easy", "medium" or "hard" to the command. Default difficulty is medium. You can also append the argument "reveal" if you want the first cell and it\'s sourroundings to be revealed at the start of the game. Reveal argumant must always tb last.',
  aliases: ['mine'],
  usage: 'minesweeper [difficulty] [reveal]',
  examples: ['minesweeper', 'minesweeper hard', 'minesweeper blank', 'minesweeper easy blank'],
  run
}
