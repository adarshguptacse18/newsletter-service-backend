const nodemailer = require("nodemailer");
const smtpPool = require('nodemailer-smtp-pool');

require('dotenv').config();

const transporter = nodemailer.createTransport(smtpPool({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_SERVICE_USERNAME,
        pass: process.env.EMAIL_SERVICE_PASSWORD
    },
    maxConnections: 2,
    sendingRate: 1,
}));

class EmailSender {
    constructor() {
    }

    async sendEmail(recipient, subject, html ) {
        console.log(`Sending email to ${recipient}`);

        const result = await transporter.sendMail({
            from: 'theadarshgupta@outlook.com',
            to: recipient,
            subject,
            html
        });
    }
}
const emailSender = new EmailSender()

emailSender.sendEmail('adarshgupta5644@gmail.com', 'Email Server Started', 'Email Server Started')

module.exports = emailSender;
