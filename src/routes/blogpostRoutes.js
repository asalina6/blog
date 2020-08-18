const express = require('express');
const blogpostRouter = express.Router();
const blogPostController = require('../controllers/blogpostController');

const { addNewBlogpostAPI } = blogPostController();

function Router(){

    blogpostRouter.route("/posts")
        .get();

    blogpostRouter.route("/posts/new")
        .post(verifyToken, addNewBlogpostAPI); //make sure to verify token, then go to posting

    return blogpostRouter();
}

//helper function

//Token is: Bearer <Access_token>
function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403); //forbidden
    }
}

export default Router;