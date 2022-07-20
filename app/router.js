const express = require('express');
const router = express.Router();
const {
    allUser,
    createUser,
    createUserRM,
} = require('./controller');

router.get('/allUser', allUser);
router.post('/createUser', createUser);
router.post('/createUserRM', createUserRM);

module.exports = router;
