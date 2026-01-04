const {
  fetchArticles,
  fetchArticleById,
  updateArticleById,
} = require("../models/articles.models");

function getArticles(request, response) {
  fetchArticles().then((articles) => {
    response.status(200).send({ articles: articles });
  });
}

function getArticleById(request, response) {
  const { article_id } = request.params;
  return fetchArticleById(article_id).then((article) => {
    response.status(200).send({ article });
  });
}

function patchArticleById(request, response, next) {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  updateArticleById(article_id, inc_votes)
    .then((article) => response.status(200).send(article))
    .catch(next);
}
module.exports = { getArticles, getArticleById, patchArticleById };
