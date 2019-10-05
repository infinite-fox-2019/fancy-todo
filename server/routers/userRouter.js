const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.list);
router.post("/", userController.register);
router.post("/login", userController.login);
router.delete("/:id", userController.remove);
router.patch("/:id/password", userController.changePassword);
router.patch("/:id/name/:name", userController.changeName);
router.patch("/:id/email/:email", userController.changeEmail);

module.exports = router;
