const Subscription = require('../models/subscription');

class SubscriptionService {
    async subscribe(userId, topicId) {
        const subscription = await new Subscription(userId, topicId).create();
        return subscription;
    }
}

module.exports = new SubscriptionService();