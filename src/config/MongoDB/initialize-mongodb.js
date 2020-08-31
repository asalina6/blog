const Users = require('../../models/Users.js');
const mockData = require('../mockMongoData.js');
const path = require('path');
const dotenv = require('dotenv');
const debug = require('debug')('server:initializeMDB');
const MongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');

dotenv.config({ path: path.normalize(path.join(__dirname, '../', '../', 'credentials.env')) });
const url = process.env.MDB_URL;

debug();

async function initializeDB() {
    let client = null;
    let db = null;
    try {
        //create client, connect to database, and check to see if data is there
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = await client.db('armandoblog');
        const collections = await db.listCollections().toArray();
        console.log(collections);
        const users = await db.collection('users');
        const count = await users.find({}).count();
        console.log('count should be: ', count);
        if (count === 0) {
            console.log('There is no data in the collection. Here I will create the collection');
            /*for(const collectionNames in mockData){
                consoawle.log(collectionNames, " : ", mockData[collectionNames]);
            }*/
        } else {
            console.log('Collection already exists');
        }
    } catch (err) {
        console.error(err);
    } finally {
        if(client){
            client.close((err, results) => {
                if (err) {
                    console.error(err);
                }
                console.log('The connection has been closed')
            });
        }
    }
}

initializeDB();

module.exports = initializeDB;