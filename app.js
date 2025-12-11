const express = require("express");
const app = express();
const db = require("./db/connection");
const getTopics = require("./controllers/topics.controllers");
const getUsers = require("./controllers/users.controllers");
const {
  getArticles,
  getArticleById,
} = require("./controllers/articles.controllers");
const {
  handlePathNotFound,
  handleServerErrors,
  handleCustomErrors,
  handleInvalidInput,
} = require("./errors");

// middleware functions

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.use(handlePathNotFound);

// Error handling middleware functions

app.use(handleCustomErrors);
app.use(handleServerErrors);
app.use(handleInvalidInput);

module.exports = app;

/*app.get("/api/topics", (request, response) => {//receives request
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {//model invoked
    response.status(200).send({ topics: rows });// data manipulation
  }); //sends response to controller 
});*/
