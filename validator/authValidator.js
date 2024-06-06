const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email: Joi.string().email({ tlds: false }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
  address: Joi.string().required().trim(),
});
