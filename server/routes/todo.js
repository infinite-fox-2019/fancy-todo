const Router = require("express").Router();
const { TodoController } = require("../controllers");
const { todoAuthorization } = require("../middlewares/auth");

Router.get("/", TodoController.findTodosByUserId);
Router.post("/", TodoController.create);

Router.patch("/:id", todoAuthorization, TodoController.updateOnId);
Router.delete("/:id", todoAuthorization, TodoController.deleteOnId);

module.exports = Router;
