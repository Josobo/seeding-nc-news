const express = require("express");
const app = express();
const getTopics = require("./controllers/topics.controllers");
const getUsers = require("./controllers/users.controllers");
const {
  getArticles,
  getArticleById,
  patchArticleById,
} = require("./controllers/articles.controllers");
const {
  handlePathNotFound,
  handleServerErrors,
  handleCustomErrors,
  handleInvalidInput,
} = require("./errors");
const {
  getCommentsByArticleId,
  postCommentsByArticleId,
  deleteComment,
} = require("./controllers/comments.controllers");
const cors = require("cors");

// middleware functions
app.use(cors());

app.use(express.json());

app.use("/api", express.static("public/index.html"));

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteComment);

app.use(handlePathNotFound);

// Error handling middleware functions
app.use(handleInvalidInput);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
