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
  'liduWidush',
  'pikaD',
  'POGGERS',
  'blurryeyes',
  'Hypers',
  'ihaa'
]

const run = (client, msg) => {
  // Prevent missuse of this command.
  if (msg.author.id !== '174509303615586304') return

  console.log('Running Daily Birthday check...')

  pg.birthdayGetAll().then((birthdayArray) => {
    const today = moment().format('MMMM Do')

    // Ramdom emotes.
    const emoteIntro = math.getRandomStringFromArray(emotesIntro, false)
    const emoteOutro = common.getCustomEmote(client, math.getRandomStringFromArray(emotesOutro, false))

    birthdayArray.forEach(user => {
      const birthday = moment(user.birthday, 'DD/MM').format('MMMM Do')

      // If we find a birthday that matches the current date, send a message!
      if (birthday === today) {
        console.log(`Found birthday match: ${user.discord_name} - ${user.birthday}`)

        // Send general chat message.
        client.channels.fetch(process.env.GENERAL_CHANNEL_ID).then((channel) => {
          channel.send({
            embeds: [{
              color: 0x2f3136,
              description: `${emoteIntro} Today is <@${user.userid}>'s, birthday! ${emoteOutro}`
            }]
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))

        // Send server owner message.
        client.users.fetch(process.env.GUILD_OWNER_ID).then((guildOwner) => {
          guildOwner.send({
            embeds: [{
              color: 0x2f3136,
              description: `${emoteIntro} **${today}:** Today, is **${user.discord_name}'s**, birthday!`
            }]
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
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
