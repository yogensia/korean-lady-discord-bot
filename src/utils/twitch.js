const axios = require('axios')

/**
 * Make a request to the Twitch API.
 * https://dev.twitch.tv/docs/api/reference
 *
 * @param {string} endpoint Endpoint url fragment (ex: `streams?user_login=apollolol`)
 * @param {Object} callback Callback object (error, response).
 */
const request = (endpoint) => {
  return new Promise((resolve, reject) => {
    // Make request to Twitch API.
    const url = `https://api.twitch.tv/helix/${endpoint}`
    axios.get(url, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID
      }
    }).then((response) => {
      if (response.data.data.length === 0) {
        reject(new Error('Twitch response was empty! Is the stream live?'))
      } else {
        resolve(response.data.data[0])
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

module.exports = {
  request
}
