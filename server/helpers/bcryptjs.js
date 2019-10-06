const bcrypt = require("bcryptjs");

const getSalt = bcrypt.genSaltSync(5);

function generateHash(string) {
  return bcrypt.hashSync(string, getSalt);
}

function compareHash(string, hash) {
  return bcrypt.compareSync(string, hash);
}

module.exports = {
  generateHash,
  compareHash
};