if(process.env.NODE_ENV == 'development'){
    require('dotenv').config();
}

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const routes = require("./routers")

const app = express()
const PORT = 3000

app.use(morgan("dev"))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/", routes)

mongoose.connect('mongodb://localhost/FancyToDo',{useNewUrlParser:true,useUnifiedTopology:true})

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})