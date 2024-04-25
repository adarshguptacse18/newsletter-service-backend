const User = require('../models/user');

class UserService {
    async create(args) {
        // TODO: validate args
        const user = await new User(args).create();
        return user;
    }
}

module.exports = new UserService();