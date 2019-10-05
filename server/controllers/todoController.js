const todoModel = require("../models/todo");
const userModel = require("../models/user");

class Todo {
  static async add(req, res, next) {
    let { title, createdAt, updatedAt, descriptions, status,dueDate} = req.body;
    let { email, _id } = req.loggedUser;
    try {
      const newTodo = await todoModel.create({
        title,
        createdAt,
        updatedAt,
        dueDate,
        descriptions,
        userId : _id,
        status
      });
      if (newTodo) {
        const updateUser = await userModel.updateOne(
          { email: { $eq: email } },
          { $push: { todoList: newTodo._id } }
        );
        return res.status(200).json(updateUser)
      } else {
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async remove(req,res,next){
    let {_id} = req.body
    try {
      const deleted = await todoModel.deleteOne({_id})
      res.status(200).json(deleted)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(req,res,next){
    let arr = ['title','descriptions','dueDate','status']
    let bodies = req.body
    let id = req.body._id
    let obj = {}
    for (let key in bodies){
      arr.forEach(element =>{
        if (element = key){
          obj[element] = bodies[element]
        }
      })
    }
    try {
      const updated = await todoModel.updateOne({_id:{$eq:id}},{$set:obj})
      res.status(200).json(updated)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = Todo;
