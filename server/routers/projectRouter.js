const router = require("express").Router();
const ProjectController = require("../controllers/projectController");
const authorizationCheckingForAddTodo = require("../middleware/authorizationCheckingForAddTodo");

router.get("/ownedProject", ProjectController.listProjectOwner); //params headers
router.get("/memberInProject", ProjectController.listMemberInProject); //params header
router.post("/", ProjectController.createNewProject);
router.patch("/addTodo/:projectId", ProjectController.addTodo); //must auth before
router.patch("/removeTodo/:projectId/:todoId", ProjectController.removeTodo); //must auth before
router.patch("/:projectId/:memberId", ProjectController.addProjectMember); //params header

module.exports = router;
router.get("/ownedProject", ProjectController.listProjectOwner);