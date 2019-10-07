if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const allRoute = require('./Routes/index')

//Mongoose Connection//-------------------------------------------->
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fancy-todo', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('We Are Connected to Mongoose')
});
//-------------------------------------------------------------->

//app.use//-------------------------------------------------------->
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use('/',allRoute);





app.listen(PORT, ()=>console.log(`Server Running on ${PORT}`))