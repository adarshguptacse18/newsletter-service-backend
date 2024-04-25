const Subscription = require('../models/subscription');

class SubscriptionService {
    async subscribe(userId, topicId) {
        const subscription = await Subscription.create(userId, topicId);
        return subscription;
    }
}

module.exports = new SubscriptionService();