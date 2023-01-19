const express = require("express")
const router = express.Router()
const controllers = require("../controllers")
const middlewares = require("../../middlewares")

router.post("/", controllers.register)
router.post("/login", controllers.login)
router.get("/", middlewares.isAuth , controllers.index)  //farah
router.delete("/", middlewares.isAuth, controllers.destroy) // Shafeeq
router.put("/me", middlewares.isAuth , controllers.update) // me
router.get("/logout", middlewares.isAuth , controllers.logOut) // me



module.exports = router