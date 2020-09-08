const common = require('../utils/common')
const anilist = require('../utils/anilist')

/**
 * Takes search terms, strip year and send a search request to the TMDb API.
 *
 * Note: The TMDb API doesn't support searching TV shows by year.
 *
 * @param {Object} msg Message object.
 * @param {string} subject Search term. Can contain a year in parenthesis.
 */
const searchAnime = async (msg, subject) => {
  // [1]: Anime title; [2]: Year.
  const regex = /(.*) \(([\d{4}]+)\)/i
  const searchByYear = subject.match(regex)
  let search

  // Request show info from TMDb API.
  if (searchByYear) {
    search = await anilist.request(msg, 'anime_search', searchByYear[1], searchByYear[2])
  } else {
    search = await anilist.request(msg, 'anime', subject)
  }

  return search
}

/**
 * Returns a data or `false` if not found.
 *
 * @param {Object} meta Anime metadata.
 */
const getMeta = (meta) => {
  if (meta) {
    return meta
  } else {
    return false
  }
}

/**
 * Returns a data or `false` if not found.
 *
 * @param {Object} meta Anime metadata.
 */
const getTitle = (title) => {
  if (title) {
    // [1]: Anime title; [2]: Year.
    const regex = /(.*) \(([\d{4}]+)\)/i
    const titleMatch = title.match(regex)

    if (titleMatch) {
      return titleMatch[1]
    } else {
      return title
    }
  } else {
    return false
  }
}

/**
 * Returns a formated runtime string or `false` if not found.
 *
 * @param {Object} movie Movie info array.
 */
const getDate = (show) => {
  const year = getMeta(show.seasonYear)

  if (show.format.toUpperCase() === 'MOVIE') {
    if (year) {
      return ` (${year})`
    } else {
      return false
    }
  } else {
    const season = common.capitalize(getMeta(show.season))

    if (year && season) {
      return ` (${season} ${year})`
    } else {
      return false
    }
  }
}

/**
 * Returns a formated runtime string or `false` if not found.
 *
 * @param {Object} movie Movie info array.
 */
const getEpisodes = (show) => {
  if (show.format.toUpperCase() === 'MOVIE') {
    return false
  } else {
    return `${show.episodes} Eps`
  }
}

/**
 * Returns a formated runtime string or `false` if not found.
 *
 * @param {Object} movie Movie info array.
 */
const getRuntime = (show) => {
  if (show.format.toUpperCase() === 'MOVIE') {
    if (show.duration) {
      const hours = (show.duration / 60)
      const rHours = Math.floor(hours)
      const minutes = (hours - rHours) * 60
      const rMinutes = Math.round(minutes)

      return `${rHours}h ${rMinutes}m`
    } else {
      return false
    }
  } else {
    return `${show.duration}m`
  }
}

/**
 * Returns a data or `false` if not found.
 *
 * @param {Object} meta Anime metadata.
 */
const getStreams = (streams) => {
  const streamLinks = []
  streams.forEach(stream => {
    if (stream.site === 'Crunchyroll') {
      streamLinks.push(stream)
    }
  })

  if (streamLinks.length > 0) {
    return streamLinks
  } else {
    return false
  }
}

const run = async (client, msg, args) => {
  // Get subject from args.
  const subject = args.join(' ')

  // Request movie info from TMDB API.
  const show = await searchAnime(msg, subject)

  if (show && show.id) {
    // Probably a good idea to abort if this is an adult show...
    const isAdult = getMeta(show.isAdult)

    if (isAdult) {
      return common.sendErrorMsg(msg, 'Sorry sempai, that movie or show appears to be NSFW and can\'t be displayed on chat!')
    }

    // Format title.
    const titleRomanji = getTitle(show.title.romaji)
    const titleEnglish = getTitle(show.title.english)
    const episodeCount = getEpisodes(show)
    const runtime = getRuntime(show)
    const date = getDate(show)
    // const episodeRuntime = getMeta(show.duration)

    let displayTitle = titleRomanji

    if (date) displayTitle = displayTitle + date
    if (episodeCount) displayTitle = displayTitle + ` · ${episodeCount}`
    if (runtime) displayTitle = displayTitle + ` · ${runtime}`

    // Prepare fields array for embed message.
    const fields = []

    if (titleEnglish) {
      fields.push({
        name: 'AKA',
        value: titleEnglish,
        inline: true
      })
    }

    const genres = getMeta(show.genres)

    if (genres) {
      fields.push({
        name: 'Genres',
        value: genres.join(', '),
        inline: true
      })
    }

    let status = common.capitalize(getMeta(show.status))

    if (status) {
      if (status === 'Releasing') {
        status = 'Airing'
      }

      fields.push({
        name: 'Status',
        value: status,
        inline: true
      })
    }

    // Trim description if longer than 350 characters.
    let description = common.trimParagraph(show.description, show.siteUrl, true)

    // Add streams at the end of the descriptions (links are not allowed in fields).
    const streamLinks = getStreams(show.externalLinks)

    if (streamLinks.length > 0) {
      streamLinks.forEach(streamLink => {
        description = description + `

        [Watch on ${streamLink.site}](${streamLink.url}).`
      })
    }

    // Reply with an embed message.
    msg.channel.send({
      embed: {
        color: 0x2f3136,
        title: displayTitle,
        url: show.siteUrl,
        thumbnail: {
          url: `${show.coverImage.large}`
        },
        description,
        fields,
        footer: {
          text: 'Data provided by AniList API – https://anilist.co/'
        }
      }
    }).catch(err => common.sendErrorMsg(msg, err))
  } else {
    common.sendErrorMsg(msg, 'Couldn\'t find any anime by that title.\nPlease check spelling and try again!')
  }
}

module.exports = {
  name: 'anime',
  desc: 'Returns info about an anime. The command will always try to find the best match, but providing a full title is still recommended for best results. Filtering by year is not supported.',
  usage: 'anime <anime title>',
  examples: ['anime Hinamatsuri'],
  args: true,
  args_error: 'You must specify an anime title!',
  run
}
