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

const request = async (msg, endpoint, query, year = false) => {
  // Make request.
  let url
  if (endpoint === 'movie') {
    url = `https://api.themoviedb.org/3/movie/${query}?api_key=${process.env.TMDB_API_KEY}`
  } else if (endpoint === 'movie_search') {
    url = `https://api.themoviedb.org/3/search/movie/?query=${query}&api_key=${process.env.TMDB_API_KEY}`
  } else if (endpoint === 'movie_search_year') {
    url = `https://api.themoviedb.org/3/search/movie/?query=${query}&year=${year}&api_key=${process.env.TMDB_API_KEY}`
  } else if (endpoint === 'movie_credits') {
    url = `https://api.themoviedb.org/3/movie/${query}/credits?api_key=${process.env.TMDB_API_KEY}`
  } else if (endpoint === 'show') {
    url = `https://api.themoviedb.org/3/tv/${query}?api_key=${process.env.TMDB_API_KEY}`
  } else if (endpoint === 'show_search') {
    url = `https://api.themoviedb.org/3/search/tv/?query=${query}&api_key=${process.env.TMDB_API_KEY}`
  } else if (endpoint === 'show_search_year') {
    url = `https://api.themoviedb.org/3/search/tv/?query=${query}&year=${year}&api_key=${process.env.TMDB_API_KEY}`
  } else if (endpoint === 'show_credits') {
    url = `https://api.themoviedb.org/3/tv/${query}/credits?api_key=${process.env.TMDB_API_KEY}`
  }

  const response = await axios.get(url).catch(err => common.sendErrorMsg(msg, err))
  return response.data
}

module.exports = {
  request
}
