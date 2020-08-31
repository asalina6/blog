const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController.js');
const { get_database } = adminController();

function router() {

    adminRouter.get('/', (req,res)=>{
        res.send('You are at admin');
    });
    
    adminRouter.get('/database', get_database);
    
    return adminRouter;
}

module.exports = router;