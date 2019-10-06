const bcrypt = require("bcrypt");

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(password, salt);
}

function decodePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, decodePassword };
