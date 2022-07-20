const express = require('express');
const router = express.Router();
const {
    createUser,
    createUserRM,
} = require('./controller');

router.post('/createUser', createUser);
router.post('/createUserRM', createUserRM);

module.exports = router;
