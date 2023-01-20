const express = require("express");
const router = express.Router();
const middlewares = require("../../middlewares");
const controllers = require("../controllers");


router.get(
  "/users",
  middlewares.isAuth,
  middlewares.isAdmin,
  controllers.getUsers
);


module.exports = router;
