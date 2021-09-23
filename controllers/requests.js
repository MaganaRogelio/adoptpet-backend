const mongoose = require('mongoose');
const Request = mongoose.model('Request');

// CRUD
function createRequest(req, res, next) {
    let request = new Pet(req.body);
    // save -> Insert into DB, then -> Ejeccución completada
    request.save().then(p => {
        res.status(200).send(p)
    }).catch(next); 
}
function getRequest (req, res, next) {
    // Define forma en la que se busca en específico
    if (req.params.id) {
        Request.findById((req.params.id))
        .then(rq => {res.send(rq)})
        .catch(next)
    } else Request.find()
        .then(rq => {res.send(rq)})
        .catch(next);
}

function updateRequest (req, res, next) {
    // Buscar
    Request.findById(req.params.id)
    .then(rq => {
        // Traer y revisar que exista
        if (!rq) return res.send(401);
        let newInfoReq = req.body;
        // Modificar
        if (typeof newInfoReq.idPet !== 'undefined') rq.idPet = newInfoPet.creatingDate;
        if (typeof newInfoReq.creatingDate !== 'undefined') pet.creatingDate = newInfoPet.creatingDate;
        if (typeof newInfoReq.idUserSponsored !== 'undefined') pet.idUserSponsored = newInfoPet.idUserSponsored;
        if (typeof newInfoReq.idUserRequest !== 'undefined') pet.idUserRequest = newInfoPet.idUserRequest;
        // Guardar
        rq.save().then(updated => {res.status(200).json(updated.publicData())})
        .catch(next);
    })
    .catch(next);
}

function deleteRequest (req, res, next) {
    Request.findOneAndDelete({_id: req.params.id}) // Ahí va la búsqueda con filter de MongoDB
    .then(rq => {res.status(200).send(`Request ${req.params.id}, ${rq.id} eliminated.`)})
    .catch(next);
}


function findPet (req, res, next) {
    let idPet = req.params.id
    Request.aggregate([
        {'$match': {'idPet': idPet}},
        {'$count': 'total'}
    ]).then(rq => {res.send(rq)})
    .catch(next);
}

module.exports = {
    createRequest,
    getRequest,
    updateRequest,
    deleteRequest,
    findPet
}