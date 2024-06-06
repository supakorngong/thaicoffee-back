const createNewError = require("../utils/createError");
const { registerSchema, loginSchema } = require("../validator/authValidator");

exports.registerValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.input = value;

  next();
};

exports.loginValidator = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    createNewError({ message: error.details[0].message });
  }
  req.input = value;
  next();
};
