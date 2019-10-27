const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {
        console.log('Connected to the database.');
    })
    .catch(err => {
        console.log('Could not connect to the database');
        console.log(err);
    })


module.exports = mongoose