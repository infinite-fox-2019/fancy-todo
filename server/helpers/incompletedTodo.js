'use strict'

const { Todo } = require('../models')
const sendEmail = require('./sendEmail')

function includeManual (arrayofObject, value) {
  const array = arrayofObject
  const keyword = value

  for (const user of array) {
    // console.log(user)
    if (user._id === keyword) {
      return true
    }
  }
}

function sendIncompletedTodo () {
  const users = []
  Todo.find({
    // Find todos that is incompleted and belong to the user only
    status: false,
    ProjectId: null
  })
    .populate({
      path: 'UserId',
      select: '_id name email'
    })
    .then((todos) => {
      for (const todo of todos) {
        const objTodo = {
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate
        }
        const userId = todo.UserId._id
        const userDetail = {
          _id: todo.UserId._id,
          name: todo.UserId.name,
          email: todo.UserId.email,
          todos: []
        }
        // Include user to users array manually
        if (!includeManual(users, userId)) {
          users.push(userDetail)
        }

        for (const user of users) {
          if (user._id === todo.UserId._id) {
            user.todos.push(objTodo)
          }
        }

        for (const user of users) {
          let message = 'List of incompleted todos'
          let number = 1
          for (const todo of user.todos) {
            message += `\n${number}. Todo Title: ${todo.title}`
            message += `\nTodo Description: ${todo.description}\n`
            number++
          }
          // Send email as a reminder of incompleted todos to user's email
          sendEmail(user.email, message)
        }
      }
    }).catch((err) => {
      console.log(err)
    })
}

module.exports = sendIncompletedTodo
