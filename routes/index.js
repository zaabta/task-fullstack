var express = require("express");
var router = express.Router();

router.use("/users", require("../lib/users/routers"));
router.use("/todoes", require("../lib/todoes/routers"));
router.use("/admins", require("../lib/admins/routers"));
router.use("/status", require("../lib/status/routers"));

module.exports = router;
