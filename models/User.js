// Usuario.js
/** Clase que representa a un usuario de la plataforma*/
/* class User {
	constructor(id, username, name, lastname, email, password, type) {
		this.id = id;
		this.username = username;
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.type = type; // tipo normal o anunciante
	}
}
module.exports = User; */

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, "Can't work without this field"],
			lowercase: true,
			match: /^[a-z0-9]+$/,
		},
		name: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: [true, "Email required"],
			match: [/\S+@\S+.\S+/, "Email invalid"],
			index: true, // Optimiza consultas en ese campo
		},
        location: String,
        phone: Number,
        bio: String,
        photo: String,
		type: { type: String, enum: ["regular", "publisher"] },
		//Valores utilizados para encriptar password
		hash: String,
		salt: String,
	},
	{ collection: "Users", timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "User already exist" });

// Cada que se define un esquema se define un public data
UserSchema.methods.publicData = function () {
	return {
		id: this.id,
		username: this.username,
		name: this.name,
		lastName: this.latName,
		email: this.email,
		type: this.type,
	};
};

UserSchema.methods.createPassword = password => {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
		.toString("hex");
};
UserSchema.methods.validPassword = password => {
	const newHash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
		.toString("hex");
	return this.hash === newHash;
};
UserSchema.methods.setJWT = () => {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			id: this._id,
			username: this.username,
			exp: parseInt(exp.getTime() / 1000),
		},  secret)
};

UserSchema.methods.toAuthJSON = () => {
	return {
		username: this.username,
		email: this.email,
		token: this.setJWT(),
	}
};

mongoose.model("User", UserSchema);
