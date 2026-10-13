const Joi = require("joi");

loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

addValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid("admin", "teacher", "student", "parent")
    .required(),
  status: Joi.number()
    .valid(0, 1)
    .required(),
});

updateValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid("admin", "teacher", "student", "parent")
    .required(),
  status: Joi.number()
    .valid(0, 1)
    .required(),
});

idValidate = Joi.number()
  .integer()
  .positive()
  .required();

statusValidate = Joi.boolean().required();

module.exports = {
  loginValidation,
  addValidation,
  updateValidation,
  idValidate,
  statusValidate,
};