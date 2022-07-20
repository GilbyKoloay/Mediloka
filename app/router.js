const express = require('express');
const router = express.Router();
const {
    allUser,
    createUser,
    updateUser,
    createUserRM,

    allDokter,
    createDokter,
    updateDokter,
} = require('./controller');

router.get('/allUser', allUser);
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.post('/createUserRM', createUserRM);

router.get('/allDokter', allDokter);
router.post('/createDokter', createDokter);
router.put('/updateDokter', updateDokter);

module.exports = router;
