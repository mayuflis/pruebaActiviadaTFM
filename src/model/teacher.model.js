//FUNCIONES RELACIONADAS CON WEB PUBLIC
//Devuelve a todos los proofesores cuyo campo validate sea igual a 1, es decir, aquellos que han sido validados por el admin.
const selecTeacherValidate = () => {
  return db.query("call validacionAdmin()");
};

//Devuelve a los profesores cuya valoración supere el 4
const selectBestRating = () => {
  return db.query(
    "select * from teachers  as t join reviews as r on r.teachers_id_teachers=t.id_teachers where rate >4"
  );
};

//Devuelve aquellos profesores en función del nombre de la asignatura que imparten
const selectTeacherForSubjects = ({ subject }) => {
  console.log("modelo", subject);
  return db.query(
    "select * from teachers where id_teachers in(select teachers_id_teachers from subjects where name= ? )",
    [subject]
  );
};

//FUNCIONES RELACIONADAS CON EL REGISTRO DE UN PROFESOR

const insertTeachers = ({
  name,
  lastname,
  email,
  password,
  role,
  latitude,
  altitude,
}) => {
  return db.query(
    "insert into teachers (name,last_name,email,password,role,latitude,altitude) values(?,?,?,?,?,?,?)",
    [name, lastname, email, password, role, latitude, altitude]
  );
};

//Seleciona al profesor en función del id
const selectByIdTeacher = (idTeacher) => {
  return db.query("select * from teachers where id_teachers=?", [idTeacher]);
};

const selectteacherByEmail = (email) => {
  return db.query("select * from teachers where email= ? ", [email]);
};
module.exports = {
  selecTeacherValidate,
  selectBestRating,
  selectTeacherForSubjects,
  insertTeachers,
  selectByIdTeacher,
  selectteacherByEmail,
};
