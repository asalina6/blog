import { MongoClient } from 'mongodb';
import { DB_NAME, BLOG_POSTS, USERS, MDB_URL }from './credentials.js'; //eslint-disable-line
const dotenv = require('dotenv');
dotenv.config({path: '../../credentials.env'});

const url = process.env.MDB_URL;
let db = null;

export async function connectDB(){
    if(db){
        console.log("DB exists");
        return db;
    }
    let client;
    try{
        client = await MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(process.env.DB_NAME);
        console.log("DB should be connected");
        return db;
    }catch(err){
        console.log(err);
    }
}