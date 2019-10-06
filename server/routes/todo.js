const Router = require("express").Router();
const { TodoController } = require("../controllers");

Router.get("/", TodoController.findTodosByUserId);
Router.post("/", TodoController.create);
Router.patch("/:id", TodoController.updateOnId);
Router.delete("/:id", TodoController.deleteOnId);

module.exports = Router;
