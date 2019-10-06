const Todo = require('../models/todo')

const authorization = (req, res, next) => {
  const _id = req.params.id
  Todo.findOne ({ _id })
  .then(data => {
    console.log(req.user.id)
    console.log(data.userId)
    if (data.userId == req.user.id ) {
      next ()
    } else {
      next({
        status: 400,
        message: `Not Your Account`
      })
    }
  })
  .catch (err => {
    res.json(err)
  })
}

module.exports = authorization
