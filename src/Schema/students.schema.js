const zod = require("zod");

//Valida el id del estudiante
const idStudents = zod
  .number({
    required_error: "id of stutends must be required",
    invalid_type_error: "Id must be a number",
  })
  .int({
    invalid_type_error: "Id must be integer",
  })
  .positive({
    invalid_type_error: "Id must be a positive number",
  });

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
  role: zod.enum(["student", "teacher"]),
});

function validateId(id) {
  return idStudents.parseAsync(id);
}

function validateRegister(object) {
  return registerValidate.parseAsync(object);
}
function loginStudents(object) {
  return registerValidate.partial().parseAsync(object);
}

module.exports = { validateId, validateRegister, loginStudents };
