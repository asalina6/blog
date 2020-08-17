const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');
const { register } = authController();

function router() {

    authRouter.route('/login')
        .get((req, res) => {
            res.send('Hi');
        });

    authRouter.route('/register')
        .post(register);

}

export default router;