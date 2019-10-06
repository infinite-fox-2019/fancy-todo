const axios = require('axios')
const GITHUB_TOKEN = process.env.GITHUB_TOKEN


const instance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: 'token ' + GITHUB_TOKEN
    }
})

module.exports = instance