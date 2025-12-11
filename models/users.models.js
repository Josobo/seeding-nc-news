const db = require("../db/connection");

function fetchUsers(users) {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
}

module.exports = fetchUsers;
