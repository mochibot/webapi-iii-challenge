const router = require('express').Router();
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  let user = req.body;
  userDb.insert(user)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be created" });
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  if (req.user) {
    let newPost = req.body;
    newPost['user_id'] = req.user;
    postDb.insert(newPost)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(error => {
        res.status(500).json({ error: "The post could not be created" });
      })
  }

});

router.get('/', (req, res) => {
  userDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "The users information could not be retrieved" });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  if (req.user) {
    userDb.getById(req.user)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved" });
      })
  }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  if (req.user) {
    userDb.getUserPosts(req.user)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved" });
      })
  }
});

router.delete('/:id', validateUserId, (req, res) => {
  if (req.user) {
    userDb.remove(req.user)
      .then(response => {
        if (response) {
          res.status(200).json(`User ${req.user} has been successfully deleted`);
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The user could not be deleted" });
      })
  }
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  if (req.user) {
    let newUser = req.body;
    userDb.update(req.user, newUser) 
      .then(response => {
        res.status(200).json(newUser)
      })
      .catch(error => {
        res.status(500).json({ error: "The user could not be updated" });
      })
  }
});

//custom middleware
function validateUserId(req, res, next) {
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
}

function validateUser(req, res, next) {
  let user = req.body;
  if (Object.keys(user).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

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
