// const User = require("../models/User");

const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
// const { unsubscribe } = require('../routes/users');

// CRUD
function createUser(req, res) {
	const body = req.body,
		password = body.password;
	delete body.password;
	const user = new User(body).createPassword(password);
	user.save()
		.then(user => res.status(200).json(user.toAuthJSON()))
		.catch(next);

	{
		/*  let user = new User(req.body);
    // save -> Insert into DB, then -> Ejeccución completada
    user.save().then(user => {
        res.status(200).send(user)
    }).catch(next);   
	let user = new User(req.body);
	res.status(200).send(user); */
	}
}

function getUsers(req, res, next) {
	User.findById(req.user.id)
		.then(user =>
			!user ? res.sendStatus(401) : res.josn(user.publicData())
		)
		.catch(next);
	/* let user1 = new User(1, 'Juanito12', 'Juan','Vega','juan@vega.com', 'abc123', 'Classic');
    let user2 = new User(2, 'Montse', 'Montserrat','Saldaña','montse@saldaña.com', 'abc123', 'sponsored');
    res.send([user1, user2]) */
}

function updateUser(req, res) {
	User.findById(req.user.id)
		.then(user => {
			if (!user) return res.sendStatus(401);
			let newInfoUser = req.body;
			if (typeof newInfoUser.username !== 'undefined')
				user.username = newInfoUser.username;
			if (typeof newInfoUser.name !== 'undefined')
				user.name = newInfoUser.name;
			if (typeof newInfoUser.lastname !== 'undefined')
				user.lastname = newInfoUser.lastname;
			if (typeof newInfoUser.email !== 'undefined')
				user.email = newInfoUser.email;
			if (typeof newInfoUser.type !== 'undefined')
				user.type = newInfoUser.type;
			if (typeof newInfoUser.password !== 'undefined') {
				user.createPassword(newInfo.password)
					.save()
					.then(updatedUSer =>
						res.status(201).json(updatedUSer.publicData())
					)
					.catch(next);
			}
		})
		.catch(next);
	/* let user = new User(req.params.id, 'Juanito12', 'Juan Jose','Vega','jujo@vega.com', 'abc123', 'Classic');
    let changes = req.body;
    user = {...user, ...changes}; // Update actual user and new data
    res.send(user); */
}

function deleteUser(req, res) {
	User.findOneAndDelete({ _id: req.user.id }).then(r =>
		res.status(200).send('User deleted')
	);
	// res.status(200).send(`User ${req.params.id} eliminated.`);
}

function logUser(req, res, next) {
	if (!req.body.email || !req.body.password) {
		return res.status(422).json({ error: { email: 'Need data' } });
	}
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err) return next(err);
		if (user) user.token = user.setJWT();
		else return res.status(422).json(info);
	})(req, res, next);
}

module.exports = {
	createUser,
	getUsers,
	updateUser,
	deleteUser,
	logUser,
};
