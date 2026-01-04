const db = require("../db/connection");

function fetchArticles(articles) {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic,
 articles.created_at, articles.votes, articles.article_img_url,
 COUNT(comment_id) AS comment_count FROM articles 
LEFT JOIN comments on articles.article_id = comments.article_id
GROUP BY articles.article_id
ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

function fetchArticleById(article_id) {
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
      return article;
    });
}

function updateArticleById(article_id, inc_votes) {
  // Validate article_id
  if (isNaN(+article_id)) {
    return Promise.reject({ status: 400, msg: "Invalid input" });
  }

  // Validate inc_votes
  if (inc_votes === undefined || typeof inc_votes !== "number") {
    return Promise.reject({ status: 400, msg: "missing votes" });
  }

  // Update the article in the database
  return db
    .query(
      `UPDATE articles
       SET votes = votes + $1
       WHERE article_id = $2
       RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        // Article not found
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}`,
        });
      }
      return article;
    });
}
module.exports = { fetchArticles, fetchArticleById, updateArticleById };
