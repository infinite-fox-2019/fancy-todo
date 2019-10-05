const Todo = require("../models/todo");

class TodoController {
  static list(req, res, next) {
    Todo.find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static listDone(req, res, next) {
    Todo.find({ status: true })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static listUndone(req, res, next) {
    Todo.find({ status: false })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static list(req, res, next) {
    Todo.find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static add(req, res, next) {
    const { title, description, status, dueDate, user } = req.body;
    Todo.create({ title, description, status, dueDate, user })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static remove(req, res, next) {
    const { id } = req.params;
    Todo.deleteOne({ _id: id })
      .then(data => {
        res.status(204).json(data);
      })
      .catch(err => {
        console.log(err);
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
        console.log(err);
      });
  }

  static changeStatusDone(req, res, next) {
    const { id } = req.params;
    Todo.updateOne({ _id: id }, { status: true })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static changeStatusUndone(req, res, next) {
    const { id } = req.params;
    Todo.updateOne({ _id: id }, { status: false })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = TodoController;
