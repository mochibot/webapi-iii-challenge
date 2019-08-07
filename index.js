// code away!
const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const server = express();

//custom middlewares
function logger(req, res, next) {
  let method = req.method;
  let url = req.url;
  let time = new Date();
  console.log(`${method} request to ${url} was made on ${time}`);
  next();
}

server.use(express.json());
server.use(helmet());
server.use(logger); //global middleware
server.use('/users', userRouter);
server.use('/posts', postRouter);

let port = 8000;
server.listen(port, () => console.log(`listening on port ${port}`));