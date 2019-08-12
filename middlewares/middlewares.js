const userDb = require('../users/userDb');
const postDb = require('../posts/postDb');

//global middleware
exports.logger = function (req, res, next) {
  let method = req.method;
  let url = req.url;
  let time = new Date();
  console.log(`${method} request to ${url} was made on ${time}`);
  next();
}

//local middlewares
exports.validateUserId = function (req, res, next) {
  let id = req.params.id;
  userDb.getById(id)
    .then(response => {
      if(!response) {
        res.status(400).json({ message: "invalid user id" })
      } else {
        req.user = id;
        next();
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user information could not be retrieved" });
    })
};

exports.validateUser = function (req, res, next) {
  let user = req.body;
  if (Object.keys(user).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
};

exports.validatePost = function (req, res, next) {
  let post = req.body;
  if (Object.keys(post).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
};

exports.validatePostId = function (req, res, next) {
  let id = req.params.id;
  postDb.getById(id)
    .then(response => {
      if (!response) {
        res.status(400).json({ message: "invalid post id" })
      } else {
        req.post = id;
        next();
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user information could not be retrieved" });
    })
};
