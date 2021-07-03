const Todo = require("../models/todo");

class TodoController {
  static list(req, res, next) {
    Todo.find({ user: req.loggedUser._id })
      .then(data => {
        if (data.length !== 0) {
          res.status(200).json(data);
        } else {
          res.status(200).json({ message: "No Todo list" });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static listDone(req, res, next) {
    Todo.find({ user: req.loggedUser._id, status: true })
      .then(data => {
        if (data.length !== 0) {
          res.status(200).json(data);
        } else {
          res.status(200).json({ message: "No Todo list" });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static listUndone(req, res, next) {
    Todo.find({ user: req.loggedUser._id, status: false })
      .then(data => {
        if (data.length !== 0) {
          res.status(200).json(data);
        } else {
          res.status(200).json({ message: "No Todo list" });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static add(req, res, next) {
    const user = req.loggedUser._id;
    const { title, description, status, dueDate } = req.body;
    Todo.create({ title, description, status, dueDate, user })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static remove(req, res, next) {
    const { id } = req.params;
    Todo.deleteOne({ _id: id })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static change(req, res, next) {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    Todo.updateOne({ _id: id }, { title, description, dueDate })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static changeStatusDone(req, res, next) {
    const { id } = req.params;
    Todo.updateOne({ _id: id }, { status: true })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static changeStatusUndone(req, res, next) {
    const { id } = req.params;
    Todo.updateOne({ _id: id }, { status: false })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = TodoController;
