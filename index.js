// code away!
const express = require('express');

const postRouter = require('./posts/postRouter');

const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());

const PORT = 8000;

// Custom Middleware

let logger = (req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
};

server.use(logger);

server.use('/api/users', userRouter);

//Starts server

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
