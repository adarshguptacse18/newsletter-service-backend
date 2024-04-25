const db = require('../db');

class User {
    constructor({ email }) {
        this.email = email;
    }

    async create() {
        try {
            const statement = 'INSERT INTO users(email) VALUES($1)';
            const values = [this.email];
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

module.exports = User;