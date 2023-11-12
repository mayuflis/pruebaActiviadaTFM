const { checkToken } = require("../middlewares/auth.middleware");

const router = require("express").Router();

//Direccion de la webpública
router.use("/webPublic", require("./api/webPublic"));

router.use("/students", checkToken, require("./api/students"));

router.use("/users", require("./api/user"));
module.exports = router;
