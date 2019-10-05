if(process.env.NODE_ENV==='development'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const index = require('./routes/index');
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/errorHandling');


app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect('mongodb://localhost/FancyTodos',{useNewUrlParser:true,useUnifiedTopology:true})
app.use('/',index)


app.use(errorMiddleware);
app.listen(PORT, function(){
    console.log(`Listening on PORT ${PORT}`)
})