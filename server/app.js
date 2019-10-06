if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const user_routes = require('./routes/userRoutes')
const todo_routes = require('./routes/todoRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
mongoose.connect('mongodb://localhost/todoFancy')
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())



app.use('/', user_routes)
app.use('/todos', todo_routes)

app.listen(PORT, ()=> {
    console.log('Server is running on PORT', PORT)
})
