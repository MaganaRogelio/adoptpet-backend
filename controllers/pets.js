// Instancia desde modelo
// const Pet = require("../models/Pet");

const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');


// CRUD
function createPet(req, res, next) {
    let pet = new Pet(req.body);
    // save -> Insert into DB, then -> Ejeccución completada
    pet.save().then(p => {
        res.status(200).send(p)
    }).catch(next); 
    
	/* let pet = new Pet(req.body);
	res.status(200).send(pet); */
}

function getPets(req, res, next) {
    // Define forma en la que se busca en específico
    if (req.params.id) {
        Pet.findById((req.params.id))
        .then(p => {res.send(p)
            console.log(p)})
        .catch(next)
    } else Pet.find()
        .then(pets => {res.send(pets)
        console.log(pets)})
        .catch(next);

    /* let pet1 = new Pet(1, 'Fluffy', 'dog', '----', 'Great dogie', '', 'mexico');
    let pet2 = new Pet(2, 'Luna', 'cat','----','Minikittie', '', 'mexico');
    res.send([pet1, pet2]) */
}

function updatePet (req, res, next) {
    // Buscar
    Pet.findById(req.params.id)
    .then(pet => {
        // Traer y revisar que exista
        if (!pet) return res.send(401);
        let newInfoPet = req.body;
        // Modificar
        if (typeof newInfoPet.name !== 'undefined') pet.name = newInfoPet.name;
        if (typeof newInfoPet.category !== 'undefined') pet.category = newInfoPet.category;
        if (typeof newInfoPet.photo !== 'undefined') pet.photo = newInfoPet.photo;
        if (typeof newInfoPet.desc !== 'undefined') pet.desc = newInfoPet.desc;
        if (typeof newInfoPet.publisher !== 'undefined') pet.publisher = newInfoPet.publisher;
        if (typeof newInfoPet.location !== 'undefined') pet.location = newInfoPet.location;
        // Guardar
        pet.save().then(updated => {res.status(200).json(updated.publicData())})
        .catch();
        // res.send(pet)
    })
    .catch(next);

    /* let pet = new Pet(req.params.id, 1, 'Fluffy', 'dog', '----', 'Great dogie familiar size', '', 'mexico');
    let changes = req.body;
    pet = {...pet, ...changes}; // Update actual user and new data
    res.send(pet); */
}

function deletePet (req, res, next) {
    Pet.findOneAndDelete({_id: req.params.id}) // Ahí va la búsqueda con filter de MongoDB
    .then(pet => {res.status(200).send(`Pet ${req.params.id}, ${pet.name} eliminated.`)})
    .catch(next);

    // res.status(200).send(`User ${req.params.id} eliminated.`);
}

function count (req, res, next) {
    let category = req.params.cat
    Pet.aggregate([
        {'$match': {'category': category}},
        {'$count': 'total'}
    ]).then(pets => {res.send(pets)})
    .catch(next);
}

module.exports = {
    createPet,
    getPets,
    updatePet,
    deletePet,
    count
}