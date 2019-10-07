const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { hashPassword, comparePassword }