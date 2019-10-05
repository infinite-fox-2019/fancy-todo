const Project = require("../models/project");

class ProjectController {
  static list(req, res, next) {
    Project.find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static add(req, res, next) {
    const { _id } = req.headers;
    console.log(req.headers);
    const { title } = req.body;
    Project.create({ projectTitle: title, owner: _id })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static addProjectMember(req, res, next) {
    const projectId = req.params.projectId;
    const memberId = req.params.memberId;
    const adminId = req.headers._id;
    Project.find({ admin: { $in: adminId } })
      .then(data => {
        console.log(data.length);
        if (data.length === 0) {
          res.status(404).json({ message: "You dont have any project" });
        } else {
          return Project.updateOne(
            { _id: projectId },
            { $push: { member: memberId } }
          );
        }
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = ProjectController;
