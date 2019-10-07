const Router = require("express").Router();
const { ProjectController } = require("../controllers");
const { projectAuthorization } = require("../middlewares/auth");

Router.get("/", ProjectController.findProjectsByUserId);
Router.post("/", ProjectController.create);
Router.get("/:id", projectAuthorization, ProjectController.findProjectById);
Router.delete("/:id", projectAuthorization, ProjectController.deleteOnId);
Router.post(
  "/:id/add-user",
  projectAuthorization,
  ProjectController.addProjectUser
);
Router.get("/:id/exit", projectAuthorization, ProjectController.exitProject);

module.exports = Router;
