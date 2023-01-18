const express = require("express")
const router = express.Router()
const controllers = require("../controllers") 
const middlewares = require("../../middlewares")


router.post("/", middlewares.isAuth, controllers.store) 
router.get("/", middlewares.isAuth, controllers.index)   
router.delete("/:id", middlewares.isAuth, controllers.destory)
router.patch("/:todoId", middlewares.isAuth, controllers.updateStatus)  

/*
router.put("/:id", middlewares.isAuth, controllers.edit) // Mahmoud Eyad MASRI
*/

module.exports = router





