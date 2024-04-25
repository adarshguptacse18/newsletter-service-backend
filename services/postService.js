const Post = require('../models/post');

class PostService {
    async create(args) {
        // TODO: validate args
        const post = await new Post(args).create();
        return post;
    }
}

module.exports = new PostService();