'use strict'

const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect(process.env.ATLAS_CONNECT, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
      console.log('Connected to MongoDB database')
    }).catch((err) => {
      console.error(err, 'Could not connected to MongoDB database')
    })
}
