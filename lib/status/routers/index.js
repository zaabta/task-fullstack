const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middleware = require("../../middlewares");

router.get("/", controllers.index);
router.post("/", middleware.isAuth, middleware.isAdmin, controllers.store);

module.exports = router;
