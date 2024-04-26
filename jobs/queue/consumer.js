const amqp = require("amqplib");

class QueueConsumer {
    constructor(queueName) {
        this.queueName = queueName;
        this.setupPromise = this._init();

    }


    async registerAsyncCallback(callback) {
        await this.setupPromise;
        this.channel.consume(this.queueName, async (message) => {
            const data = message.content.toString();
            console.log(`Recieved job with input ${data}`)
            await callback(data);
            this._ack(message);
        });
    }

    async _ack(message) {
        this.channel.ack(message);
    }


    async _init() {
        this.channel = await this._connect();
        await this.channel.assertQueue(this.queueName);
    }

    async _connect() {
        try {
            const amqpServer = process.env.QUEUE_URL;
            const connection = await amqp.connect(amqpServer)
            const channel = await connection.createChannel();
            return channel;
        }
        catch (ex) {
            console.error(ex)
        }
    }

}


module.exports = QueueConsumer;