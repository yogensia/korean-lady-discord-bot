const Minesweeper = require('discord.js-minesweeper')
const common = require('../utils/common')
const math = require('../utils/math')

// Emotes.
// const emotes = [
//   ['💥', '💥'],
//   ['ratJAM', '💥'],
//   ['michael', '💥'],
//   ['MingLee', '💥'],
//   ['grubBONK', '💥'],
//   ['gnomed', '💥'],
//   ['french', '💥'],
//   ['drakeban', '💥'],
//   ['Blobfish', '💥'],
//   ['obiHi1', '💥']
// ]
const emotes = [
  ['ratJAM', '💥'],
  ['concern', '💥']
]

// const settings = {
//   easy: {
//     columns: 9,
//     rows: 9,
//     mines: 10
//   },
//   medium: {
//     columns: 15,
//     rows: 10,
//     mines: 25
//   },
//   hard: {
//     columns: 20,
//     rows: 10,
//     mines: 60
//   }
// }

const run = async (client, msg, args) => {
  // OG Minesweeper Dificulty table.
  // -----------------------------------
  // Level          Width  Height  Mines
  // Beginner           9       9     10
  // Intermediate      16      16     40
  // Expert            30      16     99

  // Dificulty table adjusted for wider msgs (less line spam).
  // -----------------------------------
  // Level          Width  Height  Mines
  // Beginner           9       9     10
  // Intermediate      15      10     25
  // Expert            20      10     60

  const settings = {}
  if (args[0] && args[0].toLowerCase() === 'easy') {
    settings.columns = 9
    settings.rows = 9
    settings.mines = 10
  } else if (args[0] && args[0].toLowerCase() === 'hard') {
    settings.columns = 20
    settings.rows = 10
    settings.mines = 60
  } else {
    settings.columns = 15
    settings.rows = 10
    settings.mines = 25
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
    revealFirstCell: true,
    spaces: false,
    returnType: 'emoji'
  })

  // Remove semicolons to make custom guild emotes work.
  const matrix = minesweeper.start()
    .replaceAll(':<', '<')
    .replaceAll('>:', '>')

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
  desc: 'Starts a game of minesweeper. You can set the difficulty by appending "easy", "medium" or "hard" to the command. Default difficulty is medium.',
  aliases: ['mine'],
  usage: 'mine',
  run
}
