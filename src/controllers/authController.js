import { connectDB } from '../config/MongoDB/connect-mongodb';
const dotenv = require('dotenv');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

function authController() {

    dotenv.config({path: '../credentials.env'});

    function register(req, res) { //eslint-disable-line
        console.log(req.body);
    }

    async function login(req, res) {
        try {
            const { username, password } = req.body;
            const passwordhash = md5(password);

            if(!username || !password){
                return res.render(400);
                //user did not input email or password
            }

            const db = connectDB();
            const users = db.collection(process.env.USERS);
            const query = users.findOne(
                {username: {$eq: username}},
                {password: {$eq: passwordhash}}
            )
            const count = query.count();
            const id = query.id;

            if(count === 0){
                return res.render(400);
                //user not found
            }else if(count > 1){
                return res.render(400);
                //we have duplicate users, an error on our part
            }else{
                //jwt token time.
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
                res.status(200).redirect("/");
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
