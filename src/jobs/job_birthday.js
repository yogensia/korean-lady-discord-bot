const CronJob = require('cron').CronJob
const moment = require('moment-timezone')

const common = require('../utils/common')
const math = require('../utils/math')
const pg = require('../utils/pg')

// Emotes.
const emotes1 = [
  '🎉',
  '🎂',
  '🥳'
]

const emotes2 = [
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

const run = (client) => {
  /**
   * BIRTHDAY CRON JOB, runs everyday at 8 AM CET.
   *
   * Checks all birthday dates looking for matches with today's date.
   * If there are any matches, for each one sends a message to the server.
   */
  const birthdayCronJob = new CronJob('59 7 * * *', () => {
    console.log('Running Daily Birthday check...')

    repeat()
      .then((birthdayArray) => {
        const today = moment().format('MMMM Do')

        birthdayArray.forEach(user => {
          const birthday = moment(user.birthday, 'DD/MM').format('MMMM Do')

          // Ramdom emotes.
          const emote1 = math.getRandomStringFromArray(emotes1, false)
          const emote2 = common.getCustomEmote(client, math.getRandomStringFromArray(emotes2, false))

          // If we find a birthday that matches the current date, send a message!
          if (birthday === today) {
            console.log(`Found birthday match: ${user.userid} / ${user.birthday}`)
            client.channels.cache.get(process.env.GENERAL_CHANEL_ID).send({
              embed: {
                color: 0x2f3136,
                description: `${emote1} Today is <@${user.userid}>'s, birthday! ${emote2}`
              }
            }).catch(err => console.log(err))
          }
        })
      }).catch((err) => new Error(err))
  }, null, true, 'Europe/Berlin')

  birthdayCronJob.start()
}

module.exports = {
  name: 'birthdayCronJob',
  desc: 'Performs a check every day at 8 AM. If it finds any birthday record that matches the current date, a message is sent to the server.',
  run
}
