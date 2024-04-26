const nodemailer = require("nodemailer");
var smtpPool = require('nodemailer-smtp-pool');

const transporter = nodemailer.createTransport(smtpPool({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_SERVICE_USERNAME,
        pass: process.env.EMAIL_SERVICE_PASSWORD
    },
    maxConnections: 1
}));

class EmailSender {
    constructor() {
        this.messages = [];
        transporter.on("idle", this.handler.bind(this));
    }
    handler() {
        // send next message from the pending queue
        while (transporter.isIdle() && this.messages.length) {
            this.sendEmail(this.messages.shift());
        }
    }
    async addEmailToQueue(recipient, subject, html) {
        this.messages.push({
            recipient, subject, html
        });
    }
    async sendEmail({recipient, subject, html}) {
        console.log(recipient);
        await transporter.sendMail({
            from: 'theadarshgupta@outlook.com',
            to: recipient,
            subject,
            html
        });
    }
}

module.exports = new EmailSender();;