const mongoose = require('mongoose');
const { mongoUrl } = require('../config');

mongoose.connect(mongoUrl)
    .then(res => console.log(`Connected to database.`))
    .catch(error => console.log(`Failed to connect to database. ${error.message}`));