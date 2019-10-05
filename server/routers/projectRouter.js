const router = require("express").Router();
const ProjectController = require("../controllers/projectController");

router.get("/", ProjectController.list);
router.post("/", ProjectController.add);
router.post("/:projectId/:memberId", ProjectController.addProjectMember);

module.exports = router;
