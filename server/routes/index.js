const Router = require("express").Router();
const userRouter = require("./user");
const { authentication } = require("../middlewares/auth")
const todoRouter = require("./todo");
const projectRouter = require("./project")

Router.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running, developed by gunawannucky"
  });
});

Router.get("/error", (req, res, next) => {
  let err = new Error("error handler checked");
  err.name = "error checker";
  next(err);
});

//Modular Routing
Router.use("/users", userRouter);
Router.use(authentication)
Router.use("/todos", todoRouter);
Router.use("/projects", projectRouter);

module.exports = Router;
