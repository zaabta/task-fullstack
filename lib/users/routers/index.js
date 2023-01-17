const express = require("express")
const router = express.Router()
const controllers = require("../controllers")

router.post("/", controllers.register)
router.post("/login", controllers.login)


/*
router.get("/", ,controllers.getUser)  //farah
router.put("/", controllers.update) // yamen
router.patch("/", controllers.restPassword) // Mais
router.delete("/", controllers.destroy) // Shafeeq
*/


module.exports = router