const router = require('express').Router();
const postDb = require('./postDb');

router.get('/', (req, res) => {
  postDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "The users information could not be retrieved" })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  if (req.post) {
    postDb.getById(req.post)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved" })
      })
  }
});

router.delete('/:id', validatePostId, (req, res) => {
  if (req.post) {
    postDb.remove(req.post)
      .then(response => {
        res.status(200).json(`Post ${req.post} was removed successfully`);
      })
      .catch(error => {
        res.status(500).json({ error: "The post could not be deleted" })
      })
  }
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  if (req.post) {
    let newPost = req.body;
    postDb.update(req.post, newPost)
      .then(response => {
        if (response) {
          let updated = {
            ...newPost,
            post_id: req.post
          }
          res.status(200).json(updated);
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The post could not be updated" })
      })
  }
});

// custom middleware

function validatePostId(req, res, next) {
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

function validatePost(req, res, next) {
  let post = req.body;
  if (Object.keys(post).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;