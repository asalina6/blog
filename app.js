const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
const nav = [{link:'/Home', title:'Home'},
              {link:'/About', title:'About'},
              {link:'/Profile', title:'Profile'},
              {link:'/Logout', title:'Logout'}
            ];
    

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'public')));
app.set('views','./src/views');
app.set('view engine', 'ejs');

//Routers and Router functions
const homeRouter = require('./src/routes/homeRoutes')(nav);
// const aboutRouter = require('./');
// const profileRouter = require('./');

//applying router middleware, mounting them on their paths
app.use('/home', homeRouter);

app.get('/', (req,res)=>{
    res.render('index', {nav});
})

app.listen(port, ()=>{
    debug(chalk.green(`Listening on port ${port}`));
});