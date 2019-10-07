let bcrypt = require('bcryptjs');

module.exports = {
    hash: (inputPass) => {
        let salt = bcrypt.genSaltSync(10);
        return hash = bcrypt.hashSync(inputPass, salt)
    },
    check: (inputPass, hash) => {
        return bcrypt.compareSync(inputPass, hash)
    }
};