const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middleware = require("../../middlewares");

router.post("/:todoId", middleware.isAuth, controllers.store)
router.get("/:tag", middleware.isAuth, controllers.index)


module.exports = router;
