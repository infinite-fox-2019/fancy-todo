
const bcryptjs = require('bcryptjs')
const hash = (password, hashingTimes = 10) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(hashingTimes))
const compare = (password, hashedPassword) => bcryptjs.compareSync(password, hashedPassword)
module.exports = { hash, compare }
