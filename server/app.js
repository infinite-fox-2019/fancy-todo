if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const routes = require('./routes')
require('./config/mongooseConnect')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// main route
app.use('/', routes)

// start server
app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))

