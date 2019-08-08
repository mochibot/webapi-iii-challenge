const router = require('express').Router();
const postDb = require('./postDb');
const { validatePostId, validatePost } =require('../middlewares/middlewares') //import middleware from userRouter

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

// custom middleware - moved to separate folder

module.exports = router;
