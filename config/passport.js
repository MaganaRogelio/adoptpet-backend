const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		(email, password, next) => {
			User.findOne({ email: email })
				.then(user => {
					if (!user || !user.validPassword(password)) {
						return done(null, false, {
							errors : { 'email o contraseña': 'incorrecta' },
						});
					}
					return done(null, user);
				})
				.catch(next);
		}
	)
);
