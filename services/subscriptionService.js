const Subscription = require('../models/subscription');

class SubscriptionService {
    async subscribe(userId, topicId) {
        const subscription = await Subscription(userId, topicId).create();
        return subscription;
    }
}

module.exports = new SubscriptionService();