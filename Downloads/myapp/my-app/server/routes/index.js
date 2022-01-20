const express = require("express");
const router = express.Router();
const controller = require('../controller');

router
.post('/register', controller.addUser)
.get('/getAllUsersDetails', controller.getAllUsersDetails)
.get('/getUserDetailByEmail', controller.getUserDetailByEmail)


module.exports = router;