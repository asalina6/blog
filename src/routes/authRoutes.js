const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');
const { post_signup, post_login, get_logout, post_jwtverify } = authController();

function router() {
    //used for when the user logs in
    authRouter.route('/login')
        .post(post_login);
    //used for when user signs up
    authRouter.route('/signup')
        .post(post_signup);
    //used for when user logs out
    authRouter.route('/logout')
        .get(get_logout);
    //Every time App refreshes, it'll check to make sure
    //there is a user. It calls jwtverify to check jwt.
    authRouter.route('/jwtverify')
        .post(post_jwtverify);

    return authRouter;
}

module.exports = router;