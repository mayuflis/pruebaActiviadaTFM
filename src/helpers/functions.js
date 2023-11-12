const ModelTeachers = require("../model/teacher.model");

const ModelStudents = require("../model/students.model");
//Función que devuelve true en caso de que el id del usuario coincida con el id del parámetro students
const returnStudens = (students, user) => {
  let estado = false;

  students.forEach((ele) => {
    if (ele.idstudents === user.idstudents) {
      estado = true;
    } else {
      console.log(ele.idstudents);
    }
  });

  return estado;
};

//Método que inserta al usuario dependiendo del rol introducido
const insertTeachersOrStudents = async (req) => {
  let dev;
  try {
    if (req.body.role === "student") {
      const [insertId] = await ModelStudents.insertStudents(req.body);
      [dev] = await ModelStudents.getStudentsById(insertId.insertId);
    } else if (req.body.role === "teacher") {
      const [insertId] = await ModelTeachers.insertTeachers(req.body);
      [dev] = await ModelTeachers.selectByIdTeacher(insertId.insertId);
    }
  } catch (error) {
    dev = error.message;
  }

  return dev;
};

module.exports = { returnStudens, insertTeachersOrStudents };
