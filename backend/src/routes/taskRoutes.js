const express = require("express")

const taskController = require("../controllers/taskController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.use(authMiddleware)

router.post("/tasks", taskController.create)

router.get("/tasks/:listId", taskController.index)

router.put("/tasks/:id", taskController.update)

router.patch("/tasks/:id/toggle", taskController.toggle)

router.delete("/tasks/:id", taskController.delete)

module.exports = router