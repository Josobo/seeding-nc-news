const {
  fetchCommentById,
  addCommentById,
  deleteCommentById,
} = require("../models/comments.models");

function getCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  fetchCommentById(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
}
function postCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  const { username, body } = request.body;

  if (!username || !body) {
    return response.status(400).send({ msg: "Invalid input" });
  }

  addCommentById(article_id, { username, body })
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
}

function deleteComment(request, response, next) {
  const { comment_id } = request.params;

  deleteCommentById(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch(next);
}

module.exports = {
  getCommentsByArticleId,
  postCommentsByArticleId,
  deleteComment,
};
