
const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    require('dotenv').config()
}

const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    environment = NODE_ENV ? "-" + NODE_ENV : "",
    db = "FancyTodo",
    url = process.env.MONGO_DB,
    port = process.env.PORT,
    route = require('./routes'),
    errorHandler = require('./middleware/errorHandler'),
    cors = require('cors')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(url + db + environment, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("Connected to MongoDB " + db + environment)
    }).catch((err) => {
        console.log(err);
        console.log("Failed to connect to MongoDB");
    });

app.use(cors())

app.use('/', route)

app.use(errorHandler)

app.listen(port, () => console.log('Listening on port: ' + port))
