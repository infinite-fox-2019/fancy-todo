if(process.env.NODE_ENV === "development"){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log("Database Connected")})

app.use(cors())
app.use(morgan('dev'))

app.use('/', router)

app.listen(port, () => {
    console.log("App listen on port " + port)
})