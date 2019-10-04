const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = {
    hash: (password) => {
        return bcrypt.hashSync(password, salt)
    },

    comparePass: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    }

}