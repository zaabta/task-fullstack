const express = require("express");
const router = express.Router();
const middlewares = require("../../middlewares");
const controllers = require("../controllers");


//made by 
router.get(
  "/users",
  middlewares.isAuth,
  middlewares.isAdmin,
  controllers.getUsers
);

module.exports = router;
