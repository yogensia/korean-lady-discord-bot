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
  ['obiHi1', '💥'],
  ['pleaseNo', '💥']
]

const construct = async (client, msg, args) => {
  // OG Minesweeper Dificulty table.
  // -----------------------------------
  // Level          Width  Height  Mines
  // Beginner           9       9     10 : 10/81  = 0.1234
  // Intermediate      16      16     40 : 40/256 = 0.1562
  // Expert            30      16     99 : 99/480 = 0.2475

  // Dificulty table adjusted for smaller boards.
  // -----------------------------------
  // Level          Width  Height  Mines
  // Beginner           9       8      9 : 72*0.1234 = 8.88
  // Intermediate      11       8     15 : 88*0.1562 = 13.75
  // Expert            11       8     25 : 88*0.2475 = 21.78

  // Convert all args to lowercase to avoid false negatives.
  args = args.map(arg => arg.toString().toLowerCase())

  const settings = {}
  if (args[0] && args[0] === 'easy') {
    settings.columns = 9
    settings.rows = 8
    settings.mines = 9
  } else if (args[0] && args[0] === 'hard') {
    settings.columns = 11
    settings.rows = 8
    settings.mines = 27
  } else {
    settings.columns = 11
    settings.rows = 8
    settings.mines = 17
  }

  let revealFirstCell = true
  if (args.includes('blank') || args.includes('true')) {
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
  return minesweeper.start()
    .replaceAll(':<', '<')
    .replaceAll('>:', '>')
    .replaceAll(':💥:', '💥')
}

const slash = async (client, msg, interaction, args) => {
  // Reply with an embed message.
  common.interactionReply(interaction, await construct(client, msg, args))
}

const run = async (client, msg, args) => {
  // Reply with an embed message.
  common.sendEmbed(msg, await construct(client, msg, args))
}

module.exports = {
  name: 'minesweeper',
  desc: 'Creates a game of minesweeper. You can choose the difficulty by adding `easy`, `medium` or `hard` to the command. Default difficulty is `medium`.\n\nBy default a first random cell and it\'s sourroundings will be revealed at the start of the game. Use the `blank` argument at the end of the command if you don\'t want to reaveal any cells.',
  aliases: ['mine', 'ms'],
  usage: 'minesweeper [difficulty] [blank]',
  examples: ['minesweeper', 'minesweeper easy', 'minesweeper blank', 'minesweeper hard blank'],
  slash_command: {
    description: 'Creates a game of minesweeper',
    options: [
      {
        name: 'difficulty',
        value: 'difficulty',
        description: 'Choose game difficulty',
        type: 3,
        required: true,
        choices: [
          {
            name: 'Easy',
            value: 'easy'
          },
          {
            name: 'Medium',
            value: 'medium'
          },
          {
            name: 'Hard',
            value: 'hard'
          }
        ]
      },
      {
        name: 'blank',
        value: 'blank',
        description: 'Do you want the board to be blank at the start?',
        type: 5,
        required: false
      }
    ]
  },
  slash,
  run
}
