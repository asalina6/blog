const express = require('express');
const cors = require('cors');
const debug = require('debug')('server');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config( {path: path.resolve(__dirname,'./credentials.env')});

const app = express();

const port = process.env.SERVER_PORT || 3001;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'src')));

app.use(
  cors(),
  cookieParser(),
  express.urlencoded({extended: false}),
  express.json()
);



//Routers and Router functions
const authRouter = require('./routes/authRoutes')();
//const blogpostRouter = require('./routes/blogpostRoutes')();

//applying router middleware, mounting them on their paths
app.use('/auth', authRouter);
//app.use('/blogpost', blogpostRouter);

app.listen(port, () => {
  debug(chalk.green(`Listening on port ${port}`));
});