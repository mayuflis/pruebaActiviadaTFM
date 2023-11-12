const Modelteachers = require("../model/teacher.model");
const validateTeachers = require("../Schema/teacher.schema");
const getAllTeachersValidate = async (req, res) => {
  try {
    const [teachers] = await Modelteachers.selecTeacherValidate();
    res.status(200).json(teachers[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listTeachersBestRating = async (req, res) => {
  try {
    const [teachers] = await Modelteachers.selectBestRating();
    res.status(200).json(teachers[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const filterSubjects = async (req, res) => {
  try {
    console.log(req.body);
    try {
      await validateTeachers.validateSubject(req.body.subject);
    } catch (error) {
      res.status(400).json({ error: JSON.parse(error.message) });
    }

    const [subjects] = await Modelteachers.selectTeacherForSubjects(req.body);
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllTeachersValidate,
  listTeachersBestRating,
  filterSubjects,
};
