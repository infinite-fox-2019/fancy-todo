'use strict'

const nodemailer = require('nodemailer')
const email = process.env.EMAIL
const password = process.env.PASSWORD

function sendEmail (person, msg) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: password
    }
  })

  const mailInfo = {
    from: email,
    to: `${person}`,
    subject: 'Successful registration at toDone Fancy Todo',
    text: msg
  }

  transporter.sendMail(mailInfo, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log(`Email sent: ${info.response}`)
    }
  })
}

module.exports = sendEmail
