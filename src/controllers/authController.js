import { connectDB } from '../config/MongoDB/connect-mongodb';
import chalk from 'chalk';
const dotenv = require('dotenv');
const md5 = require('md5');
const path = require('path');
const jwt = require('jsonwebtoken');

function authController() {

    dotenv.config({ path: path.resolve(__dirname, '../credentials.env') });

    async function register(req, res) { //eslint-disable-line
        console.log(req.body);
    }
    async function login(req, res) {
        try {
            let errors = [];
            const { username, password } = req.body;

            console.log(username, password);
            const passwordhash = md5(password);

            //validation
            if (!username) {
                errors.push('Username is required');
            }
            if (!password) {
                errors.push('Password is required');
            }
            const usernameRegex = /(\S+)@(\S+)\.(\S+)/i;
            if (!(usernameRegex.test(username))) {
                errors.push('Invalid username');
            }
            //if there are any validation errors, return the response with the errors.
            if (errors.length > 0) {
                return res.json(JSON.stringify(errors));
            }


            const db = await connectDB();
            const users = await db.collection(process.env.USERS);
            const query = await users.find(
                { email: { $eq: username } },
                { password: { $eq: passwordhash } }
            )
            const queryArray = await query.toArray();
            const id = queryArray[0]._id;

            const count = await query.count();
            console.log('Count: ', count, ' Id: ', id);

            if (count === 0) {
                errors.push("Incorrect Login information");
                res.json(JSON.stringify(errors));
                //user not found
            } else if (count > 1) {
                errors.push("Duplicate user information. Please contact system admin.");
                res.json(JSON.stringify(errors));
                //we have duplicate users, an error on our part
            } else {
                //jwt token time.
                console.log(chalk.green('Successfu login. Creating JWT token...'));
                const payload = { id };
                const options = { expiresIn: process.env.JWT_EXPIRES_IN }
                const callback = (err, token) => res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
                const token = jwt.sign(payload, process.env.JWT_SECRET, options, callback);
                /*
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES *24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                */
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
