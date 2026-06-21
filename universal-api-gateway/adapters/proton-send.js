// Proton Mail SMTP sender
// Uses nodemailer to send via Proton Business Suite SMTP
const nodemailer = require('nodemailer');

const emailData = JSON.parse(process.argv[2]);

const transporter = nodemailer.createTransport({
  host: process.env.PROTON_SMTP_HOST || 'mail.protonmail.ch',
  port: parseInt(process.env.PROTON_SMTP_PORT || '587'),
  secure: false, // STARTTLS
  auth: {
    user: process.env.PROTON_SMTP_USER,
    pass: process.env.PROTON_SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: true
  }
});

const mailOptions = {
  from: process.env.PROTON_SMTP_USER,
  to: emailData.to,
  subject: emailData.subject,
};

if (emailData.contentType === 'text/html') {
  mailOptions.html = emailData.content;
} else {
  mailOptions.text = emailData.content;
}

transporter.sendMail(mailOptions)
  .then(info => {
    console.log(JSON.stringify({ messageId: info.messageId, response: info.response }));
    process.exit(0);
  })
  .catch(err => {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  });
