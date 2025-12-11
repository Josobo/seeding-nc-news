const {
  fetchArticles,
  fetchArticleById,
} = require("../models/articles.models");

function getArticles(request, response) {
  fetchArticles().then((articles) => {
    response.status(200).send({ articles: articles });
  });
}

function getArticleById(request, response) {
  const { article_id } = request.params;
  return fetchArticleById(article_id).then((article) => {
    console.log(article);
    response.status(200).send({ article });
  });
}

module.exports = { getArticles, getArticleById };
