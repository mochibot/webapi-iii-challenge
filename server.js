const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const { logger } = require('./middlewares/middlewares');
const server = express();

server.get('/greeting', (req, res) => {
  res.status(200).json({
    whatPennySays: process.env.GREETING
  })
});

//custom middleware - moved to separate folder

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger); //global middleware
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

module.exports = server;
