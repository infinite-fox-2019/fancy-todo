const { User, Project } = require("../models");

class ProjectController {
  static create(req, res, next) {
    const userId = req.loggedInUser._id;
    const { name, description } = req.body;
    Project.create({
      name,
      description,
      users: [userId]
    })
      .then(project => {
        res.status(201).json(project);
      })
      .catch(next);
  }

  static deleteOnId(req, res, next) {
    let { id } = req.params;
    Project.findByIdAndDelete(id)
      .then(_ => {
        res.status(204).json();
      })
      .catch(next);
  }

  static findProjectsByUserId(req, res, next) {
    let userId = req.loggedInUser._id;
    Project.find()
      .then(projects => {
        let loggedInUserProjects = projects.filter(el => {
          return el.users.includes(userId);
        });
        res.status(200).json({
          projects: loggedInUserProjects
        });
      })
      .catch(next);
  }

  static addProjectUser(req, res, next) {
    const projectId = req.params.id;
    const { email } = req.body;
    User.findOne({ email })
      .then(user => {
        if (user) {
          return Project.findByIdAndUpdate(
            projectId,
            {
              $addToSet: { users: user._id }
            },
            {
              new: true,
              runValidators: true
            }
          ).then(project => {
            res.status(200).json(project);
          });
        } else {
          next({
            statusCode: 400,
            msg: "user not found"
          });
        }
      })
      .catch(next);
  }

  static exitProject(req, res, next) {
    let userId = req.loggedInUser._id;
    let projectId = req.params.id;
    Project.findByIdAndUpdate(
      projectId,
      { $pull: { users: userId } },
      { new: true, runValidators: true }
    )
      .then(_ => {
        res.status(204).json();
      })
      .catch(next);
  }

  static findProjectById(req, res, next) {
    let { id } = req.params;
    Project.findById(id)
      .populate({ path: "todos", options: { sort: { createdAt: -1 } } })
      .populate({ path: "users", options: { sort: { name: 1 } } })
      .then(project => {
        res.status(200).json(project);
      })
      .catch(next);
  }
}

module.exports = ProjectController;
