const { Pool, types } = require('pg');


// connection string for development 
const DB_URL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

// cast numeric (OID 1700) as float (string is default in node-postgres)
types.setTypeParser(1700, function (val) {
    return parseFloat(val);
});

// instantiate pool 
const pool = new Pool({
    connectionString: DB_URL
});

module.exports = pool;