const express = require('express');
const router = express.Router();
const {
    allUser,
    createUser,
    updateUser,
    createUserRM,
} = require('./controller');

router.get('/allUser', allUser);
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.post('/createUserRM', createUserRM);

module.exports = router;
