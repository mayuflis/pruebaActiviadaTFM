const zod = require("zod");

//Valida el registro de una asignatura
const registerSubjects = zod.object({
  name: zod.enum([
    "Matemáticas",
    "Apoyo escolar",
    "Física",
    "Programación",
    "Inglés",
    "Francés",
  ]),
  level: zod
    .string({
      required_error: "Levelis required",
      invalid_type_error: "Level must be a string",
    })
    .min(3),
  hourly_rate: zod
    .number({
      required_error: "hourly_rate is required",
      invalid_type_error: "hourly_rate  must be a string",
    })
    .int()
    .positive(),
  free_class: zod
    .number({
      required_error: "free_class is required",
      invalid_type_error: "free_class  must be a string",
    })
    .int()
    .positive(),
});

//Valida el nombre de la asignatura
const name = zod.enum([
  "Matemáticas",
  "Apoyo escolar",
  "Física",
  "Programación",
  "Inglés",
  "Francés",
]);

function validateSubject(subjects) {
  return name.parseAsync(subjects);
}

module.exports = { validateSubject };
