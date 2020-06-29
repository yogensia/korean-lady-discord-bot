const axios = require('axios')
const common = require('../utils/common')

/**
 * Make a request to the TMDb API (v3).
 * https://developers.themoviedb.org/3
 *
 * Uses the TMDb API but is not endorsed or certified by TMDb.
 *
 * @param {string} endpoint Endpoint (`movie`, `search` or `credits`)
 * @param {string} query Query (ex: `550`)
 * @param {Object} msg Message object.
 */

const request = async (msg, endpoint, query, startDate = false) => {
  if (endpoint === 'anime') {
    // Make request.
    const response = await axios({
      url: 'https://graphql.anilist.co',
      method: 'POST',
      data: {
        query: `
          query ($search: String) {
            Media (type: ANIME, search: $search, sort: SEARCH_MATCH) {
              id
              idMal
              title {
                romaji
                english
              }
              description
              coverImage {
                large
              }
              season
              format
              episodes
              duration
              genres
              averageScore
              meanScore
              isAdult
              siteUrl
              status
              seasonYear
              externalLinks {
                url
                site
              }
            }
          }`,
        variables: {
          search: query
        }
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).catch(err => common.sendErrorMsg(msg, err))

    return response.data.data.Media
  } else if (endpoint === 'anime_search') {
    // Make request.
    const response = await axios({
      url: 'https://graphql.anilist.co',
      method: 'POST',
      data: {
        query: `
          query ($search: String, $year: String) {
            Media(type: ANIME, search: $search, startDate_like: $year) {
              id
              idMal
              title {
                romaji
                english
              }
              description
              coverImage {
                large
              }
              season
              format
              episodes
              duration
              genres
              averageScore
              meanScore
              isAdult
              siteUrl
              status
              seasonYear
            }
          }`,
        variables: {
          search: query,
          year: `${startDate}%`
        }
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).catch(err => common.sendErrorMsg(msg, err))

    return response.data.data.Media
  }
}

module.exports = {
  request
}
