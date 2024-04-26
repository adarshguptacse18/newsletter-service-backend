const Subscription = require('../models/subscription');

class SubscriptionService {
    async subscribe(userId, topicId) {
        const subscription = await new Subscription(userId, topicId).create();
        return subscription;
    }

    async getUsersByTopicId(topicId) {
        return await new Subscription(null, topicId).getUsersByTopicId();
    }
}

module.exports = new SubscriptionService();