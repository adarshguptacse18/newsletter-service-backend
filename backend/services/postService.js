const Post = require('../models/post');
const queuePublisher = require('../queues/publisher');

class PostService {
    async create(args) {
        // TODO: validate args
        const post = new Post(args);
        await post.startTransaction();
        await post.create();
        const { id, scheduled_at } = post;
        queuePublisher.sendToQueue({ id, scheduled_at });
        await post.commitTransaction();
        return post;
    }

    async findById(id) {
        return await new Post({id}).get();
    }
}

module.exports = new PostService();