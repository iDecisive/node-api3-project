const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {

	Users.insert({
    name: req.body.name
  })
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => {
			console.log(error);
			console.log(req.body);
			res.status(500).json({ error: 'could not post user' });
		});
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {

	Posts.insert({
    text: req.body.text,
    user_id: req.params.id
  })
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((error) => {
			console.log(error);
			console.log(req.body);
			res.status(500).json({ error: 'Unable to post comment' });
		});
});

router.get('/', (req, res) => {

	Users.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Unable to get users' });
		});
});

router.get('/:id', validateUserId, (req, res) => {
	Users.getById(req.params.id)
		.then((user) => {
			res.status(200).json({ user });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Unable to get user' });
		});
});

router.get('/:id/posts', validateUserId, (req, res) => {

	Users.getUserPosts(req.user.id)
		.then((posts) => {
			res.status(200).json({ posts });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Unable to get posts' });
		});
});

router.delete('/:id', validateUserId, (req, res) => {

	Users.remove(req.user.id)
		.then((recordsDeleted) => {
			res.status(200).json({ recordsDeleted });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Unable to delete user' });
		});
});

router.put('/:id', validateUserId, (req, res) => {

	Users.update(req.user.id, req.body)
		.then((recordsUpdated) => {
			res.status(200).json({ recordsUpdated });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Unable to update user' });
		});
});


function validateUserId(req, res, next) {
	const id = req.params.id;

	Users.getById(id)
		.then((userObject) => {
			if (userObject) {
				req.user = userObject;
				next();
			} else {
				res.status(400).json({ message: 'User ID is invalid' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'Unable to validate ID' });
		});
}


function validateUser(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'Include user data in request body' });
	} else if (!req.body.name) {
		res.status(400).json({ message: 'Include the name field in the request body' });
	}

	next();
}


function validatePost(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'Include post data' });
	} else if (!req.body.text) {
		res.status(400).json({ message: 'Include a text field' });
	}

	next();
}

module.exports = router;
