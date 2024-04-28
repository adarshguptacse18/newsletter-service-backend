const Post = require('../models/post');
const queuePublisher = require('../queues/publisher');

class PostService {
    async create(args) {
        // TODO: validate args
        const post = new Post(args);
        await post.startTransaction();
        await post.create(); 
        try {
            const { id, scheduled_at } = post;
            await queuePublisher.sendToQueue({ id, scheduled_at });
            await post.commitTransaction();
        } catch (err) {
            await post.rollbackTransaction();
            throw new Error(err);
        }
        return post.toJson();
    }

    async findById(id) {
        return await new Post({id}).get();
    }
}

module.exports = new PostService();