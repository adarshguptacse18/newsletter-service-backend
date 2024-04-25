const amqp = require("amqplib");

const msg = { number: process.argv[2] }


class QueuePublisher {
    constructor() {
        this.setup();        
    }

    async setup() {
        const amqpServer = "amqp://localhost";
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        this.exchange = "my-delay-exchange";

        await channel.assertExchange(this.exchange, "x-delayed-message", { autoDelete: false, durable: true, passive: true, arguments: { 'x-delayed-type': "direct" } });
        await channel.assertQueue("posts");

        await channel.bindQueue("posts", this.exchange, "posts");

        this.channel = channel;

    }

    async sendToQueue(msg) {
        const { scheduled_at } = msg;
        const differentInSeconds = new Date(scheduled_at) - Date.now();
        console.log(differentInSeconds);
        const result = await this.channel.publish(this.exchange, "posts", Buffer.from(JSON.stringify(msg)), { headers: { "x-delay": differentInSeconds } });
        return result;
    }

    async close() {
        await channel.close();
        await connection.close();
    }
}

module.exports = new QueuePublisher();