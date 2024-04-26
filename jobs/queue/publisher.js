const amqp = require("amqplib");

class QueuePublisher {
    constructor(queueName) {
        this.queueName = queueName;
        this.setup();
    }

    async setup() {
        const amqpServer = process.env.QUEUE_URL;
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue(this.queueName);
        this.channel = channel;
    }

    async sendToQueue(msg) {
        const result = await this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(msg)));
        return result;
    }

    async close() {
        await channel.close();
        await connection.close();
    }
}

module.exports = QueuePublisher;