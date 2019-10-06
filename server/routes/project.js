const Router = require("express").Router();
const { ProjectController } = require("../controllers");

Router.get("/", ProjectController.findProjectsByUserId);
Router.post("/", ProjectController.create);
Router.get("/:id", ProjectController.findProjectById);
Router.delete("/:id", ProjectController.deleteOnId);
Router.post("/:id/add-user", ProjectController.addProjectUser);
Router.get("/:id/exit", ProjectController.exitProject);

module.exports = Router;
