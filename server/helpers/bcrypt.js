const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function hashPassword(password){
    return bcrypt.hashSync(password,salt)
}

function comparePassword(password,hash){
    return bcrypt.compareSync(password,hash)
}

module.exports = {
    hashPassword,
    comparePassword
}