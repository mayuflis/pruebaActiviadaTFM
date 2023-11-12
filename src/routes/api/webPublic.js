const router = require("express").Router();
const webPublicController = require("../../controller/webPublic.controller");
//Mostrar la lista de profesortes que están validados
router.get("/", webPublicController.getAllTeachersValidate);
//Mostrar los profesores con mejor puntuación
router.get("/bestrating", webPublicController.listTeachersBestRating);
//Mostrar los profesores en función de la asignaturas que imparten
router.get("/subject", webPublicController.filterSubjects);
module.exports = router;
