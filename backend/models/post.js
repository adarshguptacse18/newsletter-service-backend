const db = require('../db');

class Post {
    constructor({ id, topic_id, title, content, scheduled_at}) {
        this.id = id;
        this.content = content;
        this.title = title;
        this.topic_id = topic_id;
        this.scheduled_at = new Date(scheduled_at);
    }

    async startTransaction() {
        this.client = await db.getClient();
        await this.client.query("BEGIN");
    }

    
    async create() {
        try {
            const statement = 'INSERT INTO post(topic_id, title, content, scheduled_at) VALUES($1, $2, $3, $4) RETURNING *';
            const values = [this.topic_id, this.title, this.content, this.scheduled_at];
            // TODO make this transactional with queue
            const result = await client.query(statement, values);
            // TODO: add this in the queue
            if (result.rows.length > 0) {
                this.id = result.rows[0].id;
                return result.rows[0];
            }
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async commitTransaction() {
        this.client.query("COMMIT");
    }

    async rollbackTransaction() {
        this.client.query("ROLLBACK");
    }

    async get() {
        try {
            const statement = 'SELECT * FROM post WHERE id = $1';
            const values = [this.id];
            const result = await db.query(statement, values);
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