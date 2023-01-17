const express = require("express")
const router = express.Router()
const controllers = require("../controllers") 
const middlewares = require("../../middlewares")


router.post("/", middlewares.isAuth, controllers.store) 
router.get("/", middlewares.isAuth, controllers.index)  
router.get("/status", middlewares.isAuth, controllers.getStatus)  
router.delete("/:id", middlewares.isAuth, controllers.destory) 
router.patch("/:id", middlewares.isAuth, controllers.changeStatus) // Nor

/*
router.put("/:id", middlewares.isAuth, controllers.edit) // Mahmoud Eyad MASRI
*/

module.exports = router





