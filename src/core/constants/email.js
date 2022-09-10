const nodemailer = require("nodemailer");

async function Email(body, email) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.USER,
    to: email,
    subject: "envio contraseña",
    text: `Su contraseña temporal es: ${body}`, 
    // html: "<b>Hello world?</b>",
  });
}

// Email().catch(console.error);


module.exports = Email;
