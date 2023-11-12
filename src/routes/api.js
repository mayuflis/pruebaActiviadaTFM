const router = require("express").Router();

//Direccion de la ewbpública
router.use("/webPublic", require("./api/webPublic"));
module.exports = router;
