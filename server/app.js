//LISTONIA
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes')
const errHanlder = require('./middlewares/errHandler')
const morgan = require('morgan')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : false}))


mongoose.connect('mongodb://localhost:27017/listonia', {
    useNewUrlParser : true , useUnifiedTopology: true 
}, function(err){
    if(err) {
        // console.log(err)
        console.log(`server isn't connect to mongodb`);
    }
    else {
        console.log('Connected!');
    }
})

app.use('/', index)
app.use(errHanlder)

app.listen(PORT, function(){
  console.log(`Hello from port ${PORT}`);
})