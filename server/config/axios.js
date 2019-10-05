const axios = require('axios')
const token = process.env.EVENT_TOKEN

const instance = axios.create({
    baseURL: process.env.EVENT_BASEURL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

module.exports = instance