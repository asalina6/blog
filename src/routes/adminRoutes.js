const express = require('express');
const credentials = require('../config/credentials');
const makeDb = require('../config/createDB');

const adminRouter = express.Router();

function router() {

    adminRouter.route('/')
        // eslint-disable-next-line no-unused-vars
        .get((req, res) => {
            res.send('We reconnected again?');

            (async function setUpSQLQuery() {
                //Create a connection to the database
                const connection = makeDb(credentials);
                try {
                    //creating the database
                    await connection.query('CREATE DATABASE armandoblog');

                } catch (err) {
                    console.log(err);

                    //If you created the database, this will error out. We continue with our process of inserting data into our database.
                    try{
                        console.log('tried');
                    }catch(err){
                        console.log(err);
                    }
                    //await connection.rollback();
                } finally {
                    //always close the connection
                    await connection.close();
                }
            }());
        });
    return adminRouter;
}

module.exports = router;