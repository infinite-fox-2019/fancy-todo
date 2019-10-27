const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/calendar/v3/calendars/',
    data:{
        summary: "Google I/O 2015",
        description: "makan",
        end: {
            date: "2019-11-10"
        },
        start: {
            date: "2019-11-10"
        }
    }
})

module.exports = instance