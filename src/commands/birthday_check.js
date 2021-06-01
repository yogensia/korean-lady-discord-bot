const moment = require('moment-timezone')

const common = require('../utils/common')
const math = require('../utils/math')
const pg = require('../utils/pg')

// Emotes.
const emotesIntro = [
  '🎉',
  '🎂',
  '🥳',
  '🎊'
]

const emotesOutro = [
  'Apoggies',
  'liduHyper',
  'pikaD',
  'POG',
  'blurryeyes',
  'Hypers',
  'ihaa'
]

// If connection to database fails for any reason retry after a few minutes.
const repeat = () => new Promise((resolve, reject) => {
  const interval = setInterval(() => {
    pg.birthdayGetAll().then((birthdayArray) => {
      clearInterval(interval)
      resolve(birthdayArray)
    }).catch(() => console.log('Could not connect to database, retrying in a few min...'))
  }, 60000)
})

const run = (client, msg) => {
  // Prevent missuse of this command.
  if (msg.author.id !== '174509303615586304') return

  console.log('Running Daily Birthday check...')

  repeat()
    .then((birthdayArray) => {
      const today = moment().format('MMMM Do')

      birthdayArray.forEach(user => {
        const birthday = moment(user.birthday, 'DD/MM').format('MMMM Do')

        // Ramdom emotes.
        const emoteIntro = math.getRandomStringFromArray(emotesIntro, false)
        const emoteOutro = common.getCustomEmote(client, math.getRandomStringFromArray(emotesOutro, false))

        // If we find a birthday that matches the current date, send a message!
        if (birthday === today) {
          console.log(`Found birthday match: ${user.discord_name} - ${user.birthday}`)

          // Send general chat message.
          client.channels.cache.get(process.env.GENERAL_CHANEL_ID)
            .send({
              embed: {
                color: 0x2f3136,
                description: `${emoteIntro} Today is <@${user.userid}>'s, birthday! ${emoteOutro}`
              }
            })
            .catch(err => console.log(err))

          // Send server owner message.
          client.users.cache.get(process.env.GUILD_OWNER_ID)
            .send({
              embed: {
                color: 0x2f3136,
                description: `${emoteIntro} **${today}:** Today, is **${user.discord_name}'s**, birthday!`
              }
            })
            .catch(err => console.log(err))
        }
      })
    }).catch((err) => new Error(err))
}

module.exports = {
  name: 'birthday_check',
  desc: 'Forces a manual check for birthdays. If it finds any birthday record that matches the current date, a message is sent to the server.',
  skipDocs: true,
  run
}
