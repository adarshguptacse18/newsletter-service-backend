const db = require('../db');

class Subscription {
    constructor(userId, topicId) {
        this.userId = userId;
        this.topicId = topicId;
    }

    async create() {
        try {
            const statement = 'INSERT INTO subscriptions(user_id, topic_id) VALUES($1, $2)';
            const values = [this.userId, this.topicId];
            const result = await db.update(statement, values);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getUsersByTopicId() {
        try {
            const statement = `
            SELECT users.id as user_id, users.email as email
                FROM subscriptions
                INNER JOIN users 
                ON subscriptions.user_id = users.id 
                WHERE topic_id = $1`;
            const values = [this.topicId];
            const result = await db.query(statement, values);
            if (result.rows.length > 0) {
                return result.rows;
            }
            return null;
        } catch (err) {
            throw new Error(err);
        }
    }
};


module.exports = Subscription;