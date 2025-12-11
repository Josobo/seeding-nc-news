const { path } = require("./app");

//handles invalid path
function handlePathNotFound(req, res) {
  res.status(404).send({ msg: "Path not found" });
}

function handleCustomErrors(err, req, res, next) {
  console.log(err);
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
}

//Handle server errors
function handleServerErrors(err, req, res, next) {
  console.log(err);
  res.status(500).send({ msg: "Server Error!" });
}

function handleInvalidInput(err, req, res, next) {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else next(err);
}

module.exports = {
  handleServerErrors,
  handlePathNotFound,
  handleCustomErrors,
  handleInvalidInput,
};
