const db = require('../db');

class Post {
    constructor({ id, topic_id, content, scheduled_at}) {
        this.id = id;
        this.content = content;
        this.topic_id = topic_id;
        this.scheduled_at = new Date(scheduled_at);
    }

    async create() {
        try {
            const statement = 'INSERT INTO post(topic_id, content, scheduled_at) VALUES($1, $2, $3)';
            const values = [this.topic_id, this.content, this.scheduled_at];
            // TODO make this transactional with queue
            const result = await db.query(statement, values);
            // TODO: add this in the queue
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = Post;