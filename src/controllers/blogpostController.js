import { connectDB } from '../config/MongoDB/connect-mongodb';
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const path = require('path');

//Post Model
const BlogPosts = require('../models/Posts.js');

function blogpostController() {

    dotenv.config({ path: path.resolve(__dirname, '../credentials.env') });

    //actual (req,res) function that will use helper function.
    async function addNewBlogpostAPI(req, res) {

        //helper function to post information to the database
        async function addNewBlogpostDB(blogpost) {
            let db = await connectDB(process.env.DB_NAME);
            let collection = db.collection(process.env.POST);
            await collection.insertOne(blogpost);
        }

        jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                res.status(403);
            } else {
                res.json({
                    message: "post created...",
                    authData
                })
            }
        })

        let blogpost = req.body.blogpost;
        await addNewBlogpostDB(blogpost);
        res.status(200).send();

        //another way is...
        const newPost = new BlogPosts({
            name: req.body.name
        });

        const savedPost = await newPost.save();
        res.json(savedPost);
    }

    async function getAllBlogposts(req, res) {
        try{
            const allPosts = await BlogPosts.find({}).sort({ date: -1 });
            res.json(allPosts);
        }catch(err){
            console.error(err);
        }
    }

    async function getRecentPosts(req,res){
        try{
            //get 6 recent posts
            const recentPosts = await BlogPosts.find({}).sort({ date: -1 }).limit(6);
            res.json(recentPosts);
        }catch(err){
            console.error(err);
        }
    }

    async function findBlogpost(req, res) {
        try{
            console.log(req.id);
        }catch(err){
            console.log(err);
        }
    }

    async function deleteBlogpost(req,res){
        try{
            const post = await BlogPosts.findById(req.params.id);
            post.remove();
            res.json({success: true});
        }catch(err){
            console.error(err);
            res.sendStatus(404).json({success:false});
        }
    }

    return ({
        addNewBlogpostAPI,
        getAllBlogposts,
        getRecentPosts
        findBlogpost,
        deleteBlogpost
    });
}

module.exports = blogpostController;
