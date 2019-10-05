if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routers = require('./routers')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routers)

app.listen(PORT, (req, res) => {console.log(`listening on port ${PORT}`)})