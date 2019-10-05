if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require("./routers");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost/FancyToDo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("FancyToDo Database connected");
  });

app.use("/", router);

app.listen(port, () => {
  console.log("App listen on port " + port);
});
