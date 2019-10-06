const router = require("express").Router();
const TodoController = require("../controllers/todoController");
const middlewareLogin = require("../middleware/authentication");

router.use(middlewareLogin)

router.get("/", TodoController.list);
router.get("/done", TodoController.listDone);
router.get("/undone", TodoController.listUndone);
router.post("/", TodoController.add);
router.delete("/:id", TodoController.remove);
router.put("/:id", TodoController.change);
router.patch("/:id/done", TodoController.changeStatusDone);
router.patch("/:id/undone", TodoController.changeStatusUndone);

module.exports = router;
