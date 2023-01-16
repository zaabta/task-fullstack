const express = require("express")
const router = express.Router()
const controllers = require("../controllers") 
const middlewares = require("../../middlewares")


router.post("/", middlewares.isAuth, controllers.createTodo)

module.exports = router