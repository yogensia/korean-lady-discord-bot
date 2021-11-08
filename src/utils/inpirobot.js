const axios = require('axios')
const common = require('../utils/common')

/**
 * Make a request to the Inspirobot API.
 *
 * https://inspirobot.me/api?generate=true
 */
const request = async (msg) => {
  const response = await axios.get('https://inspirobot.me/api?generate=true').catch(err => common.sendErrorMsg(msg, err))
  return response.data
}

module.exports = {
  request
}
