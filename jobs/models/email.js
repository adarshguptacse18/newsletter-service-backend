const db = require('../db');

class Email {
    constructor({ user_id, post_id }) {
        this.user_id = user_id;
        this.post_id = post_id;
    }


    async create() {
        try {
            const statement = 'INSERT INTO email(user_id, post_id) VALUES($1, $2)';
            const values = [this.user_id, this.post_id];
            const result = await db.update(statement, values);
            // TODO: add this in the queue
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = Email;