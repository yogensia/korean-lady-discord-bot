const common = require('../utils/common')
const tmdb = require('../utils/tmdb')

const getAllIndexes = (arr, val) => {
  const indexes = []
  let i
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      indexes.push(i)
    }
  }
  return indexes
}

const run = async (client, msg, args) => {
  // Get subject from args.
  const subject = args.join(' ')

  // Request movie info from TMDB API.
  const search = await tmdb.request('search', subject, msg)

  if (search && search.results.length > 0) {
    // Get additional details and crew.
    const movie = await tmdb.request('movie', search.results[0].id, msg)
    const credits = await tmdb.request('credits', search.results[0].id, msg)

    // Get year.
    const year = movie.release_date.split('-')[0]

    // Get runtime.
    const hours = (movie.runtime / 60)
    const rHours = Math.floor(hours)
    const minutes = (hours - rHours) * 60
    const rMinutes = Math.round(minutes)
    const runtime = `${rHours}h ${rMinutes}m`

    // Format title.
    const title = `${movie.title} (${year}) · ${runtime}`

    // Get director.
    let director = credits.crew.findIndex(p => p.job === 'Director')
    director = credits.crew[director].name

    // Get cast (10 top bill).
    let cast = []
    credits.cast.forEach(actor => {
      cast.push(actor.name)
    })
    cast = cast.slice(0, 9)

    // Prepare fields array for embed message.
    const fields = []

    const genres = []
    movie.genres.forEach(genre => {
      genres.push(genre.name)
    })

    fields.push({
      name: 'Director',
      value: director,
      inline: true
    })

    fields.push({
      name: 'Genres',
      value: genres.join(', '),
      inline: true
    })

    fields.push({
      name: 'TMDb Score',
      value: `${movie.vote_average} (${movie.vote_count} votes)`,
      inline: true
    })

    if (credits.cast && credits.cast.length > 0) {
      fields.push({
        name: 'Cast',
        value: cast.join(', ')
      })
    }

    // Reply with an embed message.
    msg.channel.send({
      embed: {
        color: 0x2f3136,
        title,
        url: `https://www.imdb.com/title/${movie.imdb_id}`,
        thumbnail: {
          url: `https://image.tmdb.org/t/p/original${movie.poster_path}`
        },
        description: movie.overview,
        fields,
        footer: {
          text: 'Data provided by TMDb API – https://www.themoviedb.org/'
        }
      }
    }).catch(err => common.sendErrorMsg(msg, err))
  } else {
    common.sendErrorMsg(msg, 'Couldn\'t find any movies by that title.\nPlease check spelling and try again!')
  }
}

module.exports = {
  name: 'movie',
  desc: 'Returns info about a movie.',
  aliases: ['movies', 'imdb', 'tmdb'],
  usage: 'movie <movie title>',
  examples: ['movie Alien'],
  args: true,
  args_error: 'You must specify a movie!',
  run
}
