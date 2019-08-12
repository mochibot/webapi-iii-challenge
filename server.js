const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const { logger } = require('./middlewares/middlewares');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger); //global middleware
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/greeting', (req, res) => {
  res.status(200).json({
    whatPennySays: process.env.GREETING
  })
});


if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')))

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })
}

//custom middleware - moved to separate folder

module.exports = server;
