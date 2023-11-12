const bcrypt = require("bcryptjs");
const validateStudents = require("../Schema/students.schema");
const validatTeachers = require("../Schema/teacher.schema");
const ModelStudents = require("../model/students.model");
const ModelTeachers = require("../model/teacher.model");
const { insertTeachersOrStudents } = require("../helpers/functions");
const util = require("../helpers/util");
//Crea un nuevo usuario (students or teachers)
const createrUser = async (req, res) => {
  try {
    try {
      if (req.body.role === "student") {
        await validateStudents.validateRegister(req.body);
      } else {
        await validatTeachers.validateRegister(req.body);
      }
    } catch (error) {
      res.status(400).json({ message: JSON.parse(error.message) });
    }

    //Se inserta el passwor incriptado
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const result = await insertTeachersOrStudents(req);
    return res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    try {
      await validateStudents.loginStudents(req.body);
    } catch (error) {
      res.status(400).json({ message: JSON.parse(error.message) });
    }

    //Se comprueba si el email es el de un estudiante

    let [user] = await ModelStudents.getEmail(email);
    //Si el resultado es null ,se realiza una búsqueda del email en la tabal de los profesores
    if (user.length === 0) {
      [user] = await ModelTeachers.selectteacherByEmail(email);
    }

    //Encaso de no tener coincidencia devolverá el siguiente mensaje
    if (!user[0]) {
      return res.status(403).json({ message: "Error en email y/o password" });
    }
    //En caso de que exista el email se comprueba la contraseña
    const equals = bcrypt.compareSync(password, user[0].password);

    //Si no son iguales devolvera el mensaje
    if (!equals) {
      return res.status(403).json({ message: "Error en email y/o password" });
    }
    //Una vez pasada todas las validaciones se crea un token
    res.status(200).json({
      success: "Login correcto",
      token: util.createToken(user[0]),
    });
  } catch (error) {
    res.status(400).json({ fatal: error.message });
  }
};

module.exports = { createrUser, loginUser };
