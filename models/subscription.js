const db = require('../db');

class Subscription {
    constructor(userId, topicId) {
        self.userId = userId;
        self.topicId = topicId;
    }
    
    async create() {
        try {
            const statement = 'INSERT INTO subscriptions(user_id, topic_id) VALUES($1, $2)';
            const values = [self.userId, self.topicId];
            const result = await db.query(statement, values);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }
};


module.exports = new Subscription();