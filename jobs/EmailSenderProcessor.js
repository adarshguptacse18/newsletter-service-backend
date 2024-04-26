
require('dotenv').config();
const QueueConsumer = require('./queue/consumer');
const QueuePublisher = require('./queue/publisher');
const emailSender = require('./EmailSender');

class EmailSenderProcessor {
    constructor(queueName) {
        new QueueConsumer(queueName).registerAsyncCallback(this.sendEmail);
        console.log("Starting the processor to send emails");
    }

    async sendEmail(data) {
        const { userId , email, content, postId } = JSON.parse(data);
        // TODO put in redis {userId, postId}
        // TODO send email
        console.log(`Sending email to ${email}`);

        await emailSender.addEmailToQueue(email, `New post ${postId}`, content);
        console.log(`Email sent to ${email}`);
    }
}

const emailSenderProcessor = new EmailSenderProcessor("emails");

module.exports = emailSenderProcessor;