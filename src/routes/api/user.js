const router = require("express").Router();
router.post("/register");
const UserController = require("../../controller/user.controller");
router.post("/login", UserController.loginUser);

router.post("/register", UserController.createrUser);
module.exports = router;
