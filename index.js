// code away!
const express = require('express');

const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());

const PORT = 8000;

// Custom Middleware

let logger = (req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
};

let validateUserId = (req, res, next) => {
	next();
};

server.use(logger);

server.use('/api/posts', postRouter);

//Starts server

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
