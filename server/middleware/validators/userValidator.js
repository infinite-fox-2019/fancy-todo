const { check } = require("express-validator");
const checkValidationResult = require('./validationResult');

const createUserValidator = [
  check('email').isEmail().withMessage('email format invalid'),
  check('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
  checkValidationResult
]


module.exports = {createUserValidator}

