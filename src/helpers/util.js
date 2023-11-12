const dayjs = require("dayjs");
const jsnwebtoken = require("jsonwebtoken");
const createToken = (user) => {
  let id;
  if (user.role === "student") {
    id = user.idstudents;
  } else {
    id = user.id_teachers;
  }
  const payload = {
    user_id: id,
    user_role: user.role,
    exp: dayjs().add(10, "days").unix(),
  };
  return jsnwebtoken.sign(payload, process.env.SECRET_KEY);
};
module.exports = { createToken };
