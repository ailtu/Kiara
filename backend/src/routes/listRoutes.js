const express = require("express")

const listController = require("../controllers/listController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.use(authMiddleware)

router.post("/lists", listController.create)

router.get("/lists", listController.index)

router.put("/lists/:id", listController.update)

router.delete("/lists/:id", listController.delete)

module.exports = router