const nodemailer = require('nodemailer')
const {email} = require('../config/index')
const transporter = nodemailer.createTransport({
    service: email.service,
    port: 587,
    secure: true,
    auth: {
        user: email.auth.user,
        pass: email.auth.pass
    }
})
// async..await is not allowed in global scope, must use a wrapper
async function sendMail(options) {
    // send mail with defined transport object
    const defaultOptions = {
        from: `"xiaowu gege" <${email.auth.user}>`, // sender address
        to: "15240021857@139.com", // list of receivers
        subject:"Hello ", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }
      const curOptions = Object.assign({}, defaultOptions, options || {})
      

    const info = await transporter.sendMail(curOptions);
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
//   sendMail().catch(error => console.log(error))
exports.sendMail = sendMail
  
