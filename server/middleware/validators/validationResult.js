const { validationResult } = require("express-validator");

const checkValidationResult = (req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.name = 'Validation error'
    next(errors)
  } next()
}

module.exports = checkValidationResult