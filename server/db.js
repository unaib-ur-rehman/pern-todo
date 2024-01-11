const Pool = require("pg").Pool;

const pool = new Pool({
  user: "root",
  password: "root",
  host: "localhost", // or use "127.0.0.1"
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
