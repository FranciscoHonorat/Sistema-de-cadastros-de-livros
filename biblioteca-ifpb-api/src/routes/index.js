const express = require('express');
const auths = require('./authRoute.js');
const books = require('./bookRoute.js');
const admin = require('./adminRoute.js');
const loans = require('./loansRoute.js');

module.exports = app => {
    app.use(
        express.json(),
        auths,
        books,
        admin,
        loans
    );
};