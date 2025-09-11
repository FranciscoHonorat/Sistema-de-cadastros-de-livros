const express = require('express');
const router = express.Router();

const authRoute = require('./authRoute');

//router.use('/books', require('./bookRoute'));
//router.use('/loans', require('./loansRoute'));
//router.use('/admin', require('./adminRoute'));
router.use('/auth', require('./authRoute'));

module.exports = router;