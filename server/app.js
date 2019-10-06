const consola = require("consola");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require("./routes");

if (process.env.NODE_ENV === "development") require("dotenv").config();
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    consola.success({ message: "mongodb connected", badge: true });
  })
  .catch(err => {
    consola.error({ message: "failed connect to mongdb", badge: true });
  });

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);
app.use(errorHandler);
app.listen(port, () => {
    consola.success({ message: `app listening on port port`, badge: true });
})