const Post = require('../models/post');
const queuePublisher = require('../queues/publisher');

class PostService {
    async create(args) {
        // TODO: validate args
        const post = await new Post(args).create();
        const { id, scheduled_at } = post;
        queuePublisher.sendToQueue({ id, scheduled_at });
        // TODO: handle if this queue publishing failed but post was created
        return post;
    }

    async findById(id) {
        return await new Post({id}).get();
    }
}

module.exports = new PostService();