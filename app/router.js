const express = require('express');
const router = express.Router();
const {
    allUser,
    createUser,
    updateUser,
    createUserRM,
    userLogin,

    allDokter,
    createDokter,
    updateDokter,
    createDokterP,
    updateDokterP,

    allRS,
    createRS,
    updateRSKasur,
    updateRSDarah,
    createRSAmbulans,
    updateRSAmbulans,
} = require('./controller');

router.get('/allUser', allUser);
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.post('/createUserRM', createUserRM);
router.get('/userLogin', userLogin);

router.get('/allDokter', allDokter);
router.post('/createDokter', createDokter);
router.put('/updateDokter', updateDokter);
router.post('/createDokterP', createDokterP);
router.put('/updateDokterP', updateDokterP);

router.get('/allRS', allRS);
router.post('/createRS', createRS);
router.put('/updateRSKasur', updateRSKasur);
router.put('/updateRSDarah', updateRSDarah);
router.post('/createRSAmbulans', createRSAmbulans);
router.put('/updateRSAmbulans', updateRSAmbulans);

module.exports = router;
