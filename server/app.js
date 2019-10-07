if (process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const port = process.env.PORT
const indexRoute = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', indexRoute)

app.use(errorHandler)

mongoose.connect('mongodb://localhost:27017/travel-plansDB', {useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port,function(){
    console.log(`app is listening to port ${port}`)
})