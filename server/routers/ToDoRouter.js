const routes = require("express").Router()
const ToDoController = require("../controllers/ToDoController")

routes.post("/create", ToDoController.create)
routes.get("/", ToDoController.findAll)

module.exports = routes