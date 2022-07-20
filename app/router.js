const express = require('express');
const router = express.Router();
const {
    allUser,
    createUser,
    updateUser,
    createUserRM,

    allDokter,
    createDokter,
} = require('./controller');

router.get('/allUser', allUser);
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.post('/createUserRM', createUserRM);

router.get('/allDokter', allDokter);
router.post('/createDokter', createDokter);

module.exports = router;
