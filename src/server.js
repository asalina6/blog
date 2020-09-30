const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/MongoDB/connect-mongodb');
const chalk = require('chalk');
const debug = require('debug')('server');

dotenv.config({ path: path.resolve(__dirname, './credentials.env') });

const app = express();

const port = process.env.SERVER_PORT || 3001;

app.use(
  morgan('combined'),
  express.static(path.join(__dirname, 'src')),
  cors({credentials:true, origin: 'http://localhost:3000'}),
  cookieParser(),
  express.urlencoded({ extended: false }),
  express.json()
);


//Routers and Router functions
const authRouter = require('./routes/authRoutes')();
const adminRouter = require('./routes/adminRoutes')();
//const blogpostRouter = require('./routes/blogpostRoutes')();

//applying router middleware, mounting them on their paths
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
//app.use('/blogpost', blogpostRouter);


//This starts the connection to MongoDB and then starts the server port. Async function.
const db = connectDB();

app.listen(port, () => {
  debug(chalk.green(`Listening on port ${port}`));
});