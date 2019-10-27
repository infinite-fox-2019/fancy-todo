if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const cors = require('cors')
const routers = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGOOSE_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(_ => {
    console.log('connected to mongodb')
})
.catch(err => {
    console.log(err, 'connection failed - mongoose')
})

app.use(cors())
app.use('/', routers)
app.use(errorHandler)

app.listen(PORT, (req, res) => {console.log(`listening on port ${PORT}`)})