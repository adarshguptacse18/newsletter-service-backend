
require('dotenv').config();
const QueueConsumer = require('./queue/consumer');
const QueuePublisher = require('./queue/publisher');
const emailSender = require('./emailSender');
const Email = require('./models/email');

class EmailSenderProcessor {
    constructor(queueName) {
        new QueueConsumer(queueName).registerAsyncCallback(this.sendEmail);
        console.log("Starting the processor to send emails");
    }

    async sendEmail(data) {
        try {
            const { userId, email, content, postId, title } = JSON.parse(data);
            const emailObject = new Email({ user_id: userId, post_id: postId });
            await emailObject.create(); // This is for idempotency
            await emailSender.addEmailToQueue(email, title, content);
        } catch (err) {
            console.error(`Error in sending mail too ${data} with error: ${err}`);
        }
    }
}

const emailSenderProcessor = new EmailSenderProcessor("emails");

module.exports = emailSenderProcessor;