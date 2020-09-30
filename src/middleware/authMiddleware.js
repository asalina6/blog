const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.normalize(path.join(__dirname, '../', 'credentials.env')) });

function checkUser(req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                const user = await Users.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { checkUser };