const common = require('../utils/common')
const time = require('../utils/time')

const run = (client, msg, args) => {
  // Timezone list (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
  const timezones = [
    time.getTimezone('Los Angeles (PT)', 'America/Los_Angeles'),
    time.getTimezone('Denver (MT)', 'America/Denver'),
    time.getTimezone('Chicago (CT)', 'America/Chicago'),
    time.getTimezone('New York (ET)', 'America/New_York'),
    time.getTimezone('Sao Paulo', 'America/Sao_Paulo'),
    time.getTimezone('London', 'Europe/London'),
    time.getTimezone('UTC', 'UTC'),
    time.getTimezone('Madrid', 'Europe/Madrid'),
    time.getTimezone('Berlin', 'Europe/Berlin'),
    time.getTimezone('Stockholm', 'Europe/Stockholm'),
    time.getTimezone('Moscow', 'Europe/Moscow'),
    time.getTimezone('Dubai', 'Asia/Dubai'),
    time.getTimezone('Kolkata', 'Asia/Kolkata'),
    time.getTimezone('Singapore', 'Asia/Singapore'),
    time.getTimezone('Shanghai', 'Asia/Shanghai'),
    time.getTimezone('Tokyo', 'Asia/Tokyo'),
    time.getTimezone('Sydney', 'Australia/Sydney'),
    time.getTimezone('Auckland', 'Pacific/Auckland')
  ]

  // Prepare fields array for embed message.
  const fields = []

  timezones.forEach(tz => {
    fields.push({
      name: `${tz[0]}\n(UTC${tz[2]})`,
      value: `${tz[1]}`,
      inline: true
    })
  })

  // Reply with an embed message.
  msg.channel.send({
    embeds: [{
      color: 0x2f3136,
      description: 'Here\'s a list of some cities/areas, their UTC offset and current time!',
      fields
    }]
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'timezones',
  desc: 'Show the current time in several cities of different timezones.',
  aliases: ['timezone', 'tz'],
  usage: 'timezones',
  run
}
