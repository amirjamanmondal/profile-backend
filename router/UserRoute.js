const express = require('express');
const { Signup } = require('../controllers/UserController');
const userRoute = express.Router();

userRoute.post('/signup', Signup)



module.exports = userRoute;