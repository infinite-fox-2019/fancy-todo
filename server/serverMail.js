const nodemailer = require('nodemailer');

module.exports = {
    sendMail(receiver,message) {
        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.GMAIL_MAIL,
                pass : process.env.GMAIL_PASS
            }
        });

        let mainOption = {
                from : process.env.GMAIL_MAIL,
                to : receiver,
                subject : 'Welcome to Fancy To Do by @ericsudhartio',
                text : message.msg
        }


        transporter.sendMail(mainOption)
            .then(function(){
                console.log('Successfully Send Mail!')
            })
        .catch(console.log)
            }
}