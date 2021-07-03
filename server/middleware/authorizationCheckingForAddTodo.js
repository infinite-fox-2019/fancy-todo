const Project = require("../models/project");

function authorizationCheckingForAddTodo(req, res, next) {
  const userId = req.headers;
  const projectId = req.params;
  Project.findById(projectId)
    .then(data => {
      if (data.owner === userId) {
        next();
      } else {
        for (let i = 0; i < data.member.length; i++) {
          if (data.member[i] === userId) {
            next();
          }
        }
        res.status(400).json({ message: "Not authorization user" });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = authorizationCheckingForAddTodo;
