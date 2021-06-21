const querystring = require('querystring')
const common = require('../utils/common')
const tmdb = require('../utils/tmdb')

/**
 * Takes search terms, strip year and send a search request to the TMDb API.
 *
 * Note: The TMDb API doesn't support searching TV shows by year.
 *
 * @param {Object} msg Message object.
 * @param {string} subject Search term. Can contain a year in parenthesis.
 */
const searchShow = async (msg, subject) => {
  // [1]: Show title; [2]: Year.
  const regex = /(.*) \(([\d{4}]+)\)/i
  const searchByYear = subject.match(regex)
  let search

  // Request show info from TMDb API.
  if (searchByYear) {
    search = await tmdb.request(msg, 'show_search_year', searchByYear[1], searchByYear[2])
  } else {
    search = await tmdb.request(msg, 'show_search', subject)
  }

  return search
}

/**
 * Returns a release year or `false` if not found.
 *
 * @param {Object} show Show info array.
 */
const getFirstAirDate = (show) => {
  if (show.first_air_date) {
    return show.first_air_date.split('-')[0]
  } else {
    return false
  }
}

/**
 * Returns a release year or `false` if not found.
 *
 * @param {Object} show Show info array.
 */
const getLastAirDate = (show) => {
  if (show.last_air_date) {
    return show.last_air_date.split('-')[0]
  } else {
    return false
  }
}

/**
 * Returns a formated episode count string or `false` if not found.
 *
 * @param {Object} show Show info array.
 */
const getEpisodeCount = (show) => {
  if (show.number_of_episodes) {
    return `${show.number_of_episodes} Eps`
  } else {
    return false
  }
}

/**
 * Returns a formated episode runtime string or `false` if not found.
 *
 * @param {Object} show Show info array.
 */
const getEpisodeRuntime = (show) => {
  if (show.episode_run_time && show.episode_run_time.length > 1) {
    // If there's several durations, get min and max values.
    const min = Math.min.apply(null, show.episode_run_time)
    const max = Math.max.apply(null, show.episode_run_time)

    return `${min}-${max}m`
  } else if (show.episode_run_time) {
    return `${show.episode_run_time}m`
  } else {
    return false
  }
}

/**
 * Returns an array of director names or `false` if not found.
 *
 * @param {Object} show Show info array.
 */
const getCreators = (show) => {
  const creators = []

  if (show.created_by && show.created_by.length) {
    show.created_by.forEach(creator => {
      creators.push(creator.name)
    })

    if (creators && creators.length) {
      return creators.slice(0, 9)
    } else {
      return false
    }
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
 * @param {Object} show Show info array.
 */
const getGenres = (show) => {
  const genres = []

  if (show.genres && show.genres.length) {
    show.genres.forEach(genre => {
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

  // Request movie info from TMDB API.
  const search = await searchShow(msg, subject)

  if (search && search.results.length) {
    // Get additional details and crew.
    const show = await tmdb.request(msg, 'show', search.results[0].id)
    const credits = await tmdb.request(msg, 'show_credits', search.results[0].id)

    // Get movie data.
    const beginYear = getFirstAirDate(show)
    const endYear = getLastAirDate(show)
    const episodeCount = getEpisodeCount(show)
    const episodeRuntime = getEpisodeRuntime(show)
    const creators = getCreators(show)
    const writers = getWriters(credits)
    const genres = getGenres(show)
    const cast = getCast(credits)

    // Format title.
    let title = show.name
    if (beginYear && endYear && beginYear !== endYear) {
      title = title + ` (${beginYear}-${endYear})`
    } else if (beginYear) {
      title = title + ` (${beginYear})`
    }
    if (episodeCount) title = title + ` · ${episodeCount}`
    if (episodeRuntime) title = title + ` · ${episodeRuntime}`

    // Prepare fields array for embed message.
    const fields = []

    if (creators) {
      fields.push({
        name: 'Creator(s)',
        value: creators.join(', '),
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
      value: `${show.vote_average} (${show.vote_count} votes)`,
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

    // Get url query string for search.
    const searchQuery = querystring.stringify({ q: show.name })

    // Trim description if longer than 350 characters.
    let description
    const descriptionMaxLength = 350
    if (show.overview.length > descriptionMaxLength) {
      description = show.overview.substring(0, descriptionMaxLength - 3).trim() + '...'
    } else {
      description = show.overview
    }

    // Reply with an embed message.
    msg.channel.send({
      embeds: [{
        color: 0x2f3136,
        title,
        url: `https://www.imdb.com/find?${searchQuery}`,
        thumbnail: {
          url: `https://image.tmdb.org/t/p/original${show.poster_path}`
        },
        description,
        fields,
        footer: {
          text: 'Data provided by TMDb API – https://www.themoviedb.org/'
        }
      }]
    }).catch(err => common.sendErrorMsg(msg, err))
  } else {
    common.sendErrorMsg(msg, 'Couldn\'t find any shows by that title.\nPlease check spelling and try again!')
  }
}

module.exports = {
  name: 'show',
  desc: 'Returns info about a TV show. The command will always try to find the best match, but providing a full title is still recommended for best results. You can refine your search by typing the year between parethesis.',
  usage: 'show <show title>',
  examples: ['show The Witcher', 'show Doctor Who (1963)'],
  args: true,
  args_error: 'You must specify a show title!',
  run
}
