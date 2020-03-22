const nodemailer = require("nodemailer");

const sendEmail=async(options)=> {
 
console.log("###############",options)
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD // generated ethereal password
    }
  });

  let trans = {
    from: `${process.env.SMTP_EMAIL}`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text:options.message
  };

const info =await transporter.sendMail(trans)

console.log("Message sent: %s", info.messageId);

}
module.exports = sendEmail