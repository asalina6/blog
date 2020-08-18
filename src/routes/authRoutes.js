const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');
const { register, login } = authController();

function router() {

    authRouter.route('/login')
        .post(login);

    authRouter.route('/register')
        .post(register);

    return authRouter;
}

module.exports = router;