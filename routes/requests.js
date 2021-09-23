const {
    createRequest,
	getRequest,
	updateRequest,
	deleteRequest,
    findPet
} = require("../controllers/requests");

const router = require("express").Router();

router.get('/', getRequest);
router.get('/findpet/:id', findPet);
router.get('/:id', getRequest);

// router.post('/', createRequest);

router.put('/:id', updateRequest);

router.delete('/:id', deleteRequest);

module.exports = router;