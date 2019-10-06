if (process.env.NODE_ENV==='development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = 3000
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology: true 
  })
  .then((_) => {
    console.log('server connected!')
  })
  .catch((_) => {
    console.log('server error')
  })

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => console.log('server running on port ' + port))