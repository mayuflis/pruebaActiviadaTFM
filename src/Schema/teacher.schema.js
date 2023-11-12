const zod = require("zod");
const registerValidate = zod.object({
  name: zod
    .string({
      required_error: "Name is required",
    })
    .min(3, { message: "Must be 3 or more characters long" }),
  lastname: zod.string({
    required_error: " Last name must be required",
    invalid_type_error: "Last name must be a string",
  }),
  email: zod
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Invalid email address",
    }),
  password: zod
    .string({
      required_error: "The password must be required",
      invalid_type_error: "The password must be a string",
    })
    .min(4, { message: " Must be 4 or more characters long" }),
  latitude: zod.number({
    required_error: "Latitude is required",
    invalid_type_error: "Latitude must be a number",
  }),
  altitude: zod.number({
    required_error: "Latitude is required",
    invalid_type_error: "Latitude must be a number",
  }),
  gender: zod.optional(zod.enum(["Masculino", "Femenino", "Male", "Female"])),
  birthday: zod.optional(
    zod.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    })
  ),
  image: zod.optional(
    zod.string().endsWith(".png", { message: "Only .png for images" })
  ),
});
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

//Valida la asignatura
function validateSubject(subjects) {
  return name.parseAsync(subjects);
}

//Valida el registro de profesores
function validateRegister(object) {
  return registerValidate.parseAsync(object);
}

//Valida los datos del login
function LoginTeacher(object) {
  return registerValidate.partial().parseAsync(object);
}
module.exports = { validateSubject, validateRegister, LoginTeacher };
