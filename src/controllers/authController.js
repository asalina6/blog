import { connectDB } from '../config/MongoDB/connect-mongodb';
import chalk from 'chalk';
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');

const MAX_AGE = 3 * 24 * 60 * 60 //in seconds for JWT
dotenv.config({ path: path.resolve(__dirname, '../credentials.env') });

function handleErrors(err){
    let errors = {email:'', password:''};
    //duplicate error code
    if(err.code === 11000){
        errors.email = 'That email is already registered';
    }
    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

function createToken(id){
    const payload = { id };
    const options = { expiresIn: process.env.JWT_EXPIRES_IN }
    const callback = (err, token) => res.json({
        success: true,
        token: 'Bearer ' + token
    });
    return jwt.sign(payload, process.env.JWT_SECRET, options, callback);
}


function authController() {

    

    async function register(req, res) { //eslint-disable-line
        console.log(req.body);
    }
    async function login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.login(username, password);
            const token = createToken(user._id);
            const cookieOptions = {httpOnly: false, maxAge: MAX_AGE * 1000};
            res.cookie('jwt', token, cookieOptions);
            res.status(201).json({ success: "success" });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
    }

    return ({
        register,
        login
    })
}
module.exports = authController;
