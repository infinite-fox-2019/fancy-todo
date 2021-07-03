const router = require("express").Router();
const userRouter = require("./userRouter");
const todoRouter = require("./todoRouter");
const projectRouter = require("../routers/projectRouter");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected to Fancy ToDo Server" });
});

router.use("/users", userRouter);
router.use("/todos", todoRouter);
router.use("/projects", projectRouter);

module.exports = router;
