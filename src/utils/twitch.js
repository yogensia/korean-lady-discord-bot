const axios = require('axios')

/**
 * Make a request to the Twitch API.
 * https://dev.twitch.tv/docs/api/reference
 *
 * @param {string} endpoint Endpoint url fragment (ex: `streams?user_login=apollolol`)
 * @param {Object} callback Callback object (error, response).
 */
const request = (endpoint, callback) => {
  // Make request to Twitch API.
  const url = `https://api.twitch.tv/helix/${endpoint}`
  axios.get(url, {
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID
    }
  })
  .then(function (response) {
    if (0 === response.data.data.length) {
      callback('Twitch response was empty!', undefined)
    } else {
      callback(undefined, response.data.data[0])
    }
  })
  .catch(function (error) {
    callback(error, undefined)
  })
  .then(function () {
    // Always executed.
  })
}

/**
 * Get details for a game on Twitch (name, cover art...).
 *
 * @param {string} id Stream ID in Twitch API.
 * @param {Object} callback Callback object (error, response).
 */
const getStream = (id, callback) => {
  request('streams?user_login=' + id, (error, response) => {
    if (error) {
      callback(error, undefined)
    } else {
      callback(undefined, response)
    }
  })
}

/**
 * Get details for a game on Twitch (name, cover art...).
 *
 * @param {string} id Game ID in Twitch API.
 * @param {Object} callback Callback object (error, response).
 */
const getGame = (id, callback) => {
  request('games?id=' + id, (error, response) => {
    if (error) {
      callback(error, undefined)
    } else {
      callback(undefined, response)
    }
  })
}

module.exports = {
  request,
  getStream,
  getGame
}
