const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');
const { post_register, post_login, get_logout } = authController();

function router() {

    authRouter.route('/login')
        .post(post_login);

    authRouter.route('/register')
        .post(post_register);

    authRouter.route('/logout')
        .get(get_logout);

    return authRouter;
}

module.exports = router;