const axios = require('axios')


const axiosEvent = axios.create({
  baseURL: `https://www.eventbriteapi.com/v3/events/search`,
  headers: {
      "Authorization": `Bearer ${process.env.EVENT_KEY}`
  }
})

module.exports = axiosEvent