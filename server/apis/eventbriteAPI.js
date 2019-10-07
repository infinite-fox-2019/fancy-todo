const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://www.eventbriteapi.com/v3/events/'
  })

module.exports = instance