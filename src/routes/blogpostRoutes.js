const express = require('express');
const blogpostRouter = express.Router();
const blogPostController = require('../controllers/blogpostController');

const { addNewBlogpostAPI, getAllBlogposts, getRecentPosts, findBlogpost, deleteBlogpost } = blogPostController();

function Router() {

    blogpostRouter.route("/posts/recent")
        .get(getRecentPosts)

    blogpostRouter.route("/posts")
        .get(getAllBlogposts);

    blogpostRouter.route("/posts/new")
        .post(verifyToken, addNewBlogpostAPI); //make sure to verify token, then go to posting


    blogpostRouter.route("/posts/:id")
        .delete(deleteBlogpost);

    return blogpostRouter;
}

//helper function: verifyToken
//Token is: Bearer <Access_token>
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403); //forbidden
    }
}

export default Router;