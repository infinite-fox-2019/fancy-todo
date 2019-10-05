const routes = require("express").Router()
const UserRouter = require("./UserRouter")
const ToDoRouter = require("./ToDoRouter")

routes.use("/", UserRouter)
routes.use("/ToDo", ToDoRouter)
module.exports = routes