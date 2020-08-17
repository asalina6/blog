import { connectDB } from '../config/MongoDB/connect-mongodb';
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

function blogpostController() {

    dotenv.config({path: '../credentials.env'});

    //helper function to post information to the database
    async function addNewBlogpostDB(blogpost){
        let db = await connectDB(process.env.DB_NAME);
        let collection = db.collection(process.env.POST);
        await collection.insertOne(blogpost);
    }

    //actual (req,res) function that will use helper function.
    async function addNewBlogpostAPI(req,res){

        jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
            if(err){
                res.status(403);
            }else{
                res.json({
                    message: "post created...",
                    authData
                })
            }
        })

        let blogpost = req.body.blogpost;
        await addNewBlogpostDB(blogpost);
        res.status(200).send();
    }

    return ({
        addNewBlogpostAPI
    });
}

module.exports = blogpostController;
