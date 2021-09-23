// Pet.js
/** Clase que representa un animalito a adoptar */
/* class Pet {
    constructor (id, name, category, photo, desc, publisher, location){
        this.id = id;
        this.name = name;
        this.category = category;
        this.photo = photo;
        this.desc = desc;
        this.publisher = publisher;
        this.location = location;
    }

}
module.exports = Pet; */

const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, enum: ['Dog', 'Cat', 'Other']},
    photo: String,
    desc: {type: String, required: true},
    publisher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    location: String
}, {collection: 'Pets', timestamps: true});

// Cada que se define un esquema se define un public data

PetSchema.methods.publicData = () => {
    return {
        id: this.id,
        name: this.name,
        category: this.category,
        photo: this.photo,
        desc: this.desc,
        publisher: this.publisher,
        location: this.location
    }
}

mongoose.model('Pet', PetSchema);