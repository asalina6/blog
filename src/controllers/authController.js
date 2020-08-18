import { connectDB } from '../config/MongoDB/connect-mongodb';
const dotenv = require('dotenv');
const md5 = require('md5');
const path = require('path');
//const jwt = require('jsonwebtoken');

function authController() {

    dotenv.config( {path: path.resolve(__dirname,'../credentials.env')});

    async function register(req, res) { //eslint-disable-line
        console.log(req.body);
    }

    async function login(req, res) {
        try {
            const { username, password } = req.body;
            const passwordhash = md5(password);

            if(!username || !password){
                return res.json({error: "no input"});
                //user did not input email or password. This is a huge error if this gets through.
            }

            const db = await connectDB();
            const users = await db.collection(process.env.USERS);
            const query = await users.find(
                {email: {$eq: username}},
                {password: {$eq: passwordhash}}
            )
            console.log(query);
            
            const count = await query.count();
            console.log(count);
            //const id = query.id;

            if(count === 0){
                res.json({error: "invalid credentials"});
                //user not found
            }else if(count > 1){
                return res.json({error: "duplicate users"});
                //we have duplicate users, an error on our part
            }else{
                //jwt token time.
                console.log('we made it to the token stage');
                
                /*
                const token = jwt.sign({ id }, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                }, (err, token) => console.log(token));

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES *24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                */
                return res.json({success: "success"});
            }


        } catch (err) {
            console.log(err);
        }
    }

    return ({
        register,
        login
    })
}
module.exports = authController;
