//FUNCIONES RELACIONADAS CON EL REGISTRO DE ESTUDIANTES
const insertStudents = ({ name, lastname, email, password, role }) => {
  return db.query(
    "insert into students (name,lastname,email,password,role) values(?,?,?,?,?)",
    [name, lastname, email, password, role]
  );
};

//Devuelve un alumno en función del id pasado por parámetro
const getStudentsById = (idStudents) => {
  console.log("Id=", idStudents);
  return db.query("select * from students where idstudents=?", [idStudents]);
};
//devuelve un alumno en función del email
const getEmail = (email) => {
  return db.query("select * from students where email = ?", [email]);
};

module.exports = { insertStudents, getStudentsById, getEmail };
