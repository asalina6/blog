const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');

const MAX_AGE = 3 * 24 * 60 * 60 //in seconds for JWT
dotenv.config({ path: path.resolve(__dirname, '../credentials.env') });

function handleErrors(err){
    let errors = {email:'', password:''};

    if(err.message === 'Passwords not matching'){
        errors.password = 'The passwords do not match';
    }

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
    /*const callback = (err, token) => res.json({
        success: true,
        token: 'Bearer ' + token
    });*/
    return jwt.sign(payload, process.env.JWT_SECRET, options);//, callback);
}


function authController() {

    async function post_register(req, res) {
        console.log(req.body);
        try{
            const {firstname, lastname, email, password, confirmPassword } = req.body;
            //validation occurs in Mongoose Schema
            //It will make sure required fields are entered and...com
            //that email is matched to email
            if(password !== confirmPassword){
                throw Error('Passwords not matching');
            }
            const newUser = await User.create(firstname, lastname, email, password);
            const token = createToken(newUser._id);
            res.cookie('jwt', token, {httpOnly: false, maxAge: MAX_AGE*1000});
            res.status(201).json({user: newUser._id, success: 'success'});

        }catch(err){
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
    }
    async function post_login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.login(email, password);
            const token = createToken(user._id);
            const cookieOptions = {httpOnly: false, secure: false, maxAge: MAX_AGE * 1000};
    
            
            res.cookie('jwt', token, cookieOptions);
            res.status(201).json({ success: "success", jwt: token });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
    }

    async function get_logout(req,res){
        res.json({logout:"success"});
    }

    return ({
        post_register,
        post_login,
        get_logout
    })
}
module.exports = authController;
