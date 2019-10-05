const axios = require('axios')

const axiosYoutube = axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3`,
})

module.exports = { axiosYoutube }