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

    async function post_signup(req, res) {
        console.log(req.body);
        try{
            const {firstName, lastName, email, password, confirmPassword } = req.body;
            //validation occurs in Mongoose Schema
            //It will make sure required fields are entered and do regex
            //it will also make sure email is unique.
            if(password !== confirmPassword){
                throw Error('Passwords not matching');
            }
            const newUser = await User.create({firstName, lastName, email, password});
            
            const token = createToken(newUser._id);
            const cookieOptions = {httpOnly: false, secure: false, maxAge: MAX_AGE*1000};
          
            res.cookie('jwt', token, cookieOptions);  
            //res.status(201).json({success: 'success'});
            return res.json({success: 'success', token: token});

        }catch(err){
            console.log(err);
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
    }
    async function post_login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.login(email, password);
            console.log('this is the user: ', user);
            const token = createToken(user._id);
            const cookieOptions = {httpOnly: false, secure: false, maxAge: MAX_AGE * 1000};
    
            
            res.cookie('jwt', token, cookieOptions);
            res.status(201).json({ success: "success", token: token });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
    }

    async function get_logout(req,res){
        res.cookie('jwt','',{maxAge: 1});
        res.json({logout:"success"});
    }

    async function post_jwtverify(req,res){        
        try{
            const { _token } = req.body;
            jwt.verify(_token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    res.json({error: 'Error in token verify'});
                } else {
                    console.log(decodedToken);
                    const user = await User.findById(decodedToken.id);
                    const email = user.email;
                    const firstName = user.firstName;
                    const lastName = user.lastName;
                    const id = user._id;
                    res.json({status:'success', id: id, firstName: firstName , lastName: lastName, email: email});
                }
            }); 
        }catch(err){
            console.log(err);
            res.json({error: 'Error in try catch of post_jwtverify'});
        }
    }

    return ({
        post_signup,
        post_login,
        get_logout,
        post_jwtverify
    })
}
module.exports = authController;
