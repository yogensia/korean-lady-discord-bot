const common = require('../utils/common')
const tmdb = require('../utils/tmdb')

/**
 * Takes search terms, checks for year and send a search request to the TMDb API.
 *
 * @param {Object} msg Message object.
 * @param {string} subject Search term. Can contain a year in parenthesis.
 */
const searchMovie = async (msg, subject) => {
  // [1]: Movie title, [2]: Year
  const regex = /(.*) \(([\d{4}]+)\)/i
  const searchByYear = subject.match(regex)
  let search

  // Request movie info from TMDb API.
  if (searchByYear) {
    search = await tmdb.request(msg, 'movie_search_year', searchByYear[1], searchByYear[2])
  } else {
    search = await tmdb.request(msg, 'movie_search', subject)
  }

  return search
}

/**
 * Returns a release year or `false` if not found.
 *
 * @param {Object} movie Movie info array.
 */
const getReleaseDate = (movie) => {
  if (movie.release_date) {
    return movie.release_date.split('-')[0]
  } else {
    return false
  }
}

/**
 * Returns a formated runtime string or `false` if not found.
 *
 * @param {Object} movie Movie info array.
 */
const getRuntime = (movie) => {
  if (movie.runtime) {
    const hours = (movie.runtime / 60)
    const rHours = Math.floor(hours)
    const minutes = (hours - rHours) * 60
    const rMinutes = Math.round(minutes)

    return `${rHours}h ${rMinutes}m`
  } else {
    return false
  }
}

/**
 * Returns an array of director names or `false` if not found.
 *
 * @param {Object} credits Credits info array.
 */
const getDirector = (credits) => {
  const director = []

  credits.crew.map(el => {
    if (el.job === 'Director') {
      director.push(el.name)
    }
  })

  if (director && director.length) {
    return director
  } else {
    return false
  }
}

/**
 * Returns an array of director names or `false` if not found.
 *
 * @param {Object} credits Credits info array.
 */
const getWriters = (credits) => {
  const writers = []

  credits.crew.map(el => {
    if (el.department === 'Writing') {
      writers.push(el.name)
    }
  })

  if (writers && writers.length) {
    // Filter out duplicate elements in array.
    return writers.filter((item, index) => writers.indexOf(item) === index)
  } else {
    return false
  }
}

/**
 * Returns an array of actor names or `false` if not found.
 *
 * @param {Object} movie Movie info array.
 */
const getGenres = (movie) => {
  const genres = []

  if (movie.genres && movie.genres.length) {
    movie.genres.forEach(genre => {
      genres.push(genre.name)
    })

    return genres
  } else {
    return false
  }
}

/**
 * Returns an array of actor names or `false` if not found.
 *
 * @param {Object} credits Credits info array.
 */
const getCast = (credits) => {
  const cast = []

  if (credits.cast && credits.cast.length) {
    credits.cast.forEach(actor => {
      cast.push(actor.name)
    })

    return cast.slice(0, 9)
  } else {
    return false
  }
}

const run = async (client, msg, args) => {
  // Get subject from args.
  const subject = args.join(' ')

  const search = await searchMovie(msg, subject)

  if (search && search.results.length) {
    // Get additional details and crew.
    const movie = await tmdb.request(msg, 'movie', search.results[0].id)
    const credits = await tmdb.request(msg, 'movie_credits', search.results[0].id)

    // Get movie data.
    const year = getReleaseDate(movie)
    const runtime = getRuntime(movie)
    const director = getDirector(credits)
    const writers = getWriters(credits)
    const genres = getGenres(movie)
    const cast = getCast(credits)

    // Format title.
    let title = movie.title
    if (year) title = title + ` (${year})`
    if (runtime) title = title + ` · ${runtime}`

    // Prepare fields array for embed message.
    const fields = []

    if (director) {
      fields.push({
        name: 'Director',
        value: director.join(', '),
        inline: true
      })
    }

    if (genres) {
      fields.push({
        name: 'Genres',
        value: genres.join(', '),
        inline: true
      })
    }

    fields.push({
      name: 'TMDb Score',
      value: `${movie.vote_average} (${movie.vote_count} votes)`,
      inline: true
    })

    if (writers) {
      fields.push({
        name: 'Writers',
        value: writers.join(', ')
      })
    }

    if (cast) {
      fields.push({
        name: 'Cast',
        value: cast.join(', ')
      })
    }

    // Trim description if longer than 350 characters.
    let description
    const descriptionMaxLength = 350
    if (movie.overview.length > descriptionMaxLength) {
      description = movie.overview.substring(0, descriptionMaxLength - 3).trim() + '...'
    } else {
      description = movie.overview
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
        description,
        fields,
        footer: {
          text: 'Data provided by TMDb API – https://www.themoviedb.org/'
        }
      }
    }).catch(err => common.sendErrorMsg(msg, err))
  } else {
    common.sendErrorMsg(msg, `Sorry, couldn't find any movies by that title.
      Please check spelling and try again!

      **Tip:** You can refine your search by typing the year between parethesis.
      Ex: \`${process.env.PREFIX}movie Total Recall (1990)\``)
  }
}

module.exports = {
  name: 'movie',
  desc: 'Returns info about a movie. The command will always try to find the best match, but providing a full title is still recommended for best results. You can refine your search by typing the year between parethesis.',
  usage: 'movie <movie title>',
  examples: ['movie Alien', 'movie Total Recall (1990)'],
  args: true,
  args_error: 'You must specify a movie title!',
  run
}
