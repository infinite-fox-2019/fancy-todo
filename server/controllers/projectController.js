const Project = require("../models/project");
const Todo = require("../models/todo");

class ProjectController {
  static createNewProject(req, res, next) {
    const { _id } = req.headers;
    console.log(req.headers);
    const { title } = req.body;
    Project.create({ projectTitle: title, owner: _id })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err)
      });
  }

  static listProjectOwner(req, res, next) {
    const ownerId = req.headers._id;
    Project.find({ owner: ownerId })
      .then(data => {
        if (data.length === 0) {
          res.status(404).json({ message: "You dont have any project" });
        } else {
          res.status(200).json(data);
        }
      })
      .catch(err => {
        next(err)
      });
  }

  static listMemberInProject() {
    const memberId = req.params.headers;
    Project.find({ member: { $in: { member: memberId } } })
      .then(data => {
        if (data.length === 0) {
          res
            .status(404)
            .json({ message: "You are not a member of any project" });
        } else {
          res.status(200).json(data);
        }
      })
      .err(err => {
        next(err)
      });
  }

  static addProjectMember(req, res, next) {
    const projectId = req.params.projectId;
    const memberId = req.params.memberId;
    const ownerId = req.headers._id;
    Project.findById({ _id: projectId })
      .then(data => {
        console.log(data);
        if (!data || data === undefined) {
          res.status(404).json({ message: "Project Not Found" });
        } else {
          console.log(ownerId, data.owner);
          if (data.owner == ownerId) {
            return Project.updateOne(
              { _id: projectId },
              { $addToSet: { member: memberId } }
            );
          } else {
            res.status(400).json({ message: "Not authorization user" });
          }
        }
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err)
      });
  }

  // static authorizationCheckingForAddTodo(req, res, next) {
  //   const userId = req.headers;
  //   const projectId = req.params;
  //   Project.findById(projectId)
  //     .then(data => {
  //       if (data.owner === userId) {
  //         next();
  //       } else {
  //         for (let i = 0; i < data.member.length; i++) {
  //           if (data.member[i] === userId) {
  //             next();
  //           }
  //         }
  //         res.status(400).json({ message: "Not authorization user" });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  static addTodo(req, res, next) {
    const { projectId } = req.params;
    const { title, description, dueDate } = req.body;
    Todo.create({ title, description, dueDate })
      .then(data => {
        return Project.findByIdAndUpdate(projectId, {
          $push: { todo: data._id }
        });
      })
      .then(() => {
        res.status(200).json({ message: "updated" });
      })
      .catch(err => {
        next(err)
      });
  }

  static removeTodo(req, res, next) {
    const { projectId, todoId } = req.params;
    Todo.deleteOne({ _id: todoId })
      .then(data => {
        return Project.findByIdAndUpdate(projectId, {
          $pull: { todo: todoId }
        });
      })
      .then(data => {
        res.status(204).json(data);
      })
      .catch(err => {
        next(err)
      });
  }
}

module.exports = ProjectController;
