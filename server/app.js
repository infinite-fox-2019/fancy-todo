if(process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}

const mongoose = require('mongoose')
const express = require('express')
const routes = require('./routes')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3000
const db = mongoose.connection;

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(morgan('dev'))

mongoose.connect('mongodb://localhost/fancyTodo',{useNewUrlParser:true, useUnifiedTopology:true})


db.on('error', console.error.bind(console, 'connection error:'));

app.use('/',routes)


app.listen(PORT,()=>console.log(`listening on ${PORT}`))