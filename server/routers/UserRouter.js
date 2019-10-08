const routes = require("express").Router()
const UserController = require("../controllers/UserController")

routes.post("/register", UserController.Register)
routes.post("/login", UserController.loginBiasa)
routes.post("/loginGoogle", UserController.loginGoogle)

module.exports = routes