const {
    createPet,
	getPets,
	updatePet,
	deletePet,
    count
} = require("../controllers/pets");

const router = require("express").Router();

router.get('/', getPets);
router.get('/count/:cat', count);
router.get('/:id', getPets);

router.post('/', createPet);

router.put('/:id', updatePet);

router.delete('/:id', deletePet);

module.exports = router;