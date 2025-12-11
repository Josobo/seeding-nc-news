const db = require("../db/connection");

function fetchTopics(topics) {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
}

module.exports = fetchTopics;
