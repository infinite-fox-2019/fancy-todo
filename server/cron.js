'use strict'

const CronJob = require('cron').CronJob
// const sendIncompletedTodo= require('./helpers/incompletedTodo')

new CronJob('0 8 * * 1 *', function () {
  sendIncompletedTodo()
}, null, true, 'Asia/Jakarta')
