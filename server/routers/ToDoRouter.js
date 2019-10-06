const routes = require("express").Router()
const ToDoController = require("../controllers/ToDoController")

routes.post("/create", ToDoController.create)
routes.get("/", ToDoController.findAll)
routes.delete("/delete/:_id", ToDoController.delete)
routes.put("/:id", ToDoController.updateOne)

module.exports = routes