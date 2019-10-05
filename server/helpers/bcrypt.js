const bcrypt = require("bcryptjs")

function hashPassword (password) {
    const salt = 5;
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function compare (password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    compare
}