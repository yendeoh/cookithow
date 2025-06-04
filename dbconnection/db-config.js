require("dotenv").config();
const sql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const db = pool.connect()
    .then(() => console.log("Connected to MS SQL database"))
    .catch(err => console.error("Database connection failed:", err));

module.exports = { sql, db };