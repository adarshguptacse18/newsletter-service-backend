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
        this.messages = [];
        this.handler();
    }
    async handler() {
        // send next message from the pending queue
        while (transporter.isIdle() && this.messages.length) {
            await this.sendEmail(this.messages.shift());
        }
        setTimeout(() => {
            this.handler();
        }, 1000);
    }
    async addEmailToQueue(recipient, subject, html) {
        this.messages.push({
            recipient, subject, html
        });
    }
    async sendEmail({ recipient, subject, html }) {
        console.log(recipient);
        await transporter.sendMail({
            from: 'theadarshgupta@outlook.com',
            to: recipient,
            subject,
            html
        });
    }
}

const emailSender = new EmailSender()

emailSender.addEmailToQueue('adarshgupta5644@gmail.com', 'Email Server Started', 'Email Server Started')

module.exports = emailSender;
