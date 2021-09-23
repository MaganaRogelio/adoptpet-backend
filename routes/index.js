let router = require('express').Router();


router.get('/', (req,res) => {
    res.send('Welcome to Adoptapet');
})

router.use('/users', require('./users'));
router.use('/pets', require('./pets'));
router.use('/reqs', require('./requests'));

module.exports = router;