const router = require("express").Router();
const passport = require("passport");
const loginController = require("../controllers/login.controller");

router.post("/login", passport.authenticate("local"), loginController);

module.exports = router;
