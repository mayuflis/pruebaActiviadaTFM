const jsonwebtoken = require("jsonwebtoken");
const ModelTeachers = require("../model/teacher.model");
const ModelStudents = require("../model/students.model");
const checkToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  //Se verifica si hay cabecera
  if (!token) {
    return res
      .status(403)
      .json({ message: "Necesitas la cabecera de autorización" });
  }
  let payload;
  //En caso de que haya cabecera se comprueba  que el token sea válido
  try {
    //Si la dependencia jsonwebtoken no realiza ninguna excepción ,retornará el token decodificado
    payload = jsonwebtoken.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
  console.log(payload);
  let user;
  //Con el token decodificado compruebo el rol para discriminar de que tipo de usuario es
  if (payload.user_role === "student") {
    [user] = await ModelStudents.getStudentsById(payload.user_id);
  } else {
    [user] = await ModelTeachers.selectByIdTeacher(payload.user_id);
  }

  //Introduzco en la petición un objeto con los datos del usuario
  req.user = user;
  next();
};

module.exports = { checkToken };
