if (process.env.NODE_ENV === 'development') {require('dotenv').config()}

const express = require('express')
require('./confg/mongoConnect')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)


app.use(errorHandler)
app.listen(port, () => { console.log(`this app run on port ${port}`) })