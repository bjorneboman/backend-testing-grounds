
const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

router.get("/", usersController.getAllUsers)
router.get("/:id", usersController.getUserById)
router.post("/", usersController.createUser)
router.delete("/:id", usersController.deleteUser)

module.exports = router

