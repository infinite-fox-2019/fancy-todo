if(process.env.NODE_ENV == "development"){
    require('dotenv').config()
}

const express = require('express');
const router = require('./routes/index')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/FancyTodo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('masuk');
    })
    .catch(err=>{
        console.log(err);
    })

app.use('/', router)

app.listen(port, ()=>{
    console.log('listening in '+ port);
})