const express = require('express');
const cors = require('cors');
const debug = require('debug')('server');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const dotenv = require(dotenv);
import { connectDB } from './config/MongoDB/connect-mongodb.js';

dotenv.config({path:'./credentials.env'});
const app = express();

const port = process.env.PORT || 3001;
/*const nav = [{ link: '/Home', title: 'Home' },
{ link: '/About', title: 'About' },
{ link: '/Profile', title: 'Profile' },
{ link: '/Logout', title: 'Logout' }
];*/


app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'src')));

app.use(
  cors(),
  //bodyParser is considered obsolete, use express.JSON
  //bodyParser.urlencoded({ extended: true }),
  //bodyParser.json()
  express.urlencoded({extended: true}),
  express.json()
);

//Testing our posting

export const addNewBlogPost = async (blogPost) => {
  let db = await connectDB(process.env.DB_NAME);
  let collection = db.collection(process.env.POST);
  await collection.insertOne(blogPost);
}

app.post('/blogpost/new', async (req,res)=>{
 let blogpost = req.body.blogpost;
 await addNewBlogPost(blogpost);
 res.status(200).send();
});

//Routers and Router functions
const authRouter = require('./routes/authRoutes');
//const homeRouter = require('./routes/homeRoutes')(nav);
//const adminRouter = require('./routes/adminRoutes')();
// const aboutRouter = require('./');
// const profileRouter = require('./');

//applying router middleware, mounting them on their paths
app.use('/auth', authRouter);
//app.use('/home', homeRouter);
//app.use('/admin', adminRouter);

app.listen(port, () => {
  debug(chalk.green(`Listening on port ${port}`));
});