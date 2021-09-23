// Solicitud.js
/** Clase que representa una solicitud de adopción */
/* class Request {
	constructor(
		id,
		idPet,
		creatingDate,
		idUserSponsored,
		idUserRequest,
		state
	) {
		this.id = id;
		this.idPet = idPet;
		this.creatingDate = creatingDate;
		this.idUserSponsored = idUserSponsored;
		this.idUserRequest = idUserRequest;
		this.state = state;
	}
}

module.exports = Request; */

const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
	{
		idPet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
		creatingDate: { type: Date, required: true },
		idUserSponsored: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		idUserRequest: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		state: { type: String, enum: ["Aprobado", "Disponible", "Pendiente"] },
	},
	{ collection: "Requests", timestamps: true }
);

// Cada que se define un esquema se define un public data

RequestSchema.methods.publicData = () => {
	return {
		id: this.id,
		idPet: this.idPet,
		creatingDate: this.creatingDate,
		idUserSponsored: this.idUserSponsored,
		idUserRequest: this.idUserRequest,
		state: this.state,
	};
};

mongoose.model("Request", RequestSchema);
