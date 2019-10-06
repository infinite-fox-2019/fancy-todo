const router = require("express").Router();
const userController = require("../controllers/userController");
const middlewareLogin = require("../middleware/authentication");

router.get("/", userController.list);
router.post("/", userController.register);
router.post("/login", userController.login);
// router.delete("/:id", middlewareLogin, userController.remove);
// router.patch("/:id/password", middlewareLogin, userController.changePassword);
// router.patch("/:id/name/:name", middlewareLogin, userController.changeName);
// router.patch("/:id/email/:email", middlewareLogin, userController.changeEmail);

module.exports = router;
