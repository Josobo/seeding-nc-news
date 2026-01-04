const db = require("../db/connection");

function fetchCommentById(article_id) {
  if (isNaN(+article_id)) {
    return Promise.reject({ status: 400, msg: "Invalid input" });
  }
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}`,
        });
      }

      return db.query(
        `SELECT * FROM comments WHERE article_id = $1
        ORDER BY created_at DESC`,
        [article_id]
      );
    })
    .then(({ rows }) => {
      return rows;
    });
}
function addCommentById(article_id, comment) {
  const { username, body } = comment;
  if (isNaN(+article_id)) {
    return Promise.reject({ status: 400, msg: "Invalid input" });
  }
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}`,
        });
      }

      return db.query("SELECT * FROM users WHERE username = $1", [username]);
    })
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Username not found",
        });
      }
      return db
        .query(
          `
      INSERT INTO comments (author, body, article_id)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
          [username, body, article_id]
        )
        .then((result) => {
          return result.rows[0];
        });
    });
}

function deleteCommentById(comment_id) {
  if (isNaN(comment_id)) {
    return Promise.reject({ status: 400, msg: "Invalid input" });
  }

  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Comment not found for comment_id: ${comment_id}`,
        });
      }
      return;
    });
}
module.exports = { fetchCommentById, addCommentById, deleteCommentById };
