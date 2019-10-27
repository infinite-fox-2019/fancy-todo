const mongoose = require('mongoose')
const url = process.env.MONGOOSE_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(_ => console.log('connected to mongoose'))
    .catch(err => console.log(err))