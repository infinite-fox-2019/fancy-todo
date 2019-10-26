const https = require('https')
const app = require('../app')
const fs = require('fs')
const PORT = process.env.SECURE_PORT || 443

const domain = 'c-todo.crowfx.xyz'

const option = {
    cert: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/privkey.pem')
}

const server = https.createServer(option, app)

server.listen(PORT, () => console.log('HTTPS server on port ' + PORT))