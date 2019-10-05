const axios = require('axios')

const bored = axios.create({
    baseURL: 'http://www.boredapi.com/'
  });

module.exports = bored