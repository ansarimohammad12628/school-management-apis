const Joi = require("joi");

addValidation = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  status: Joi.number().valid(0, 1).required(),
  type: Joi.string().valid("USER", "SERVICEMEN").required(),
});
updateValidation = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  status: Joi.number().valid(0, 1).required(),
  type: Joi.string().valid("USER", "SERVICEMEN").required(),
});

idValidate = Joi.number().integer().positive().required();
statusValidate = Joi.boolean().required();

module.exports = {
  addValidation,
  updateValidation,
  idValidate,
  statusValidate,
};
