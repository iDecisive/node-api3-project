const express = require('express');

const postDb = require('./postDb.js');

const router = express.Router();

// root is /api/posts

router.get('/', (req, res) => {
	// do your magic!
	res.send('ok');
});

router.get('/:id', (req, res) => {
	// do your magic!
});

router.delete('/:id', (req, res) => {
	// do your magic!
});

router.put('/:id', (req, res) => {
	// do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
	// do your magic!
}

module.exports = router;
