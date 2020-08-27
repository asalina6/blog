const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const debug = require('debug')('server:connectDB');
dotenv.config( {path: path.resolve(__dirname,'./credentials.env')});

const url = process.env.MDB_URL;
let db = null;

export async function connectDB(){
    if(db){
        debug("DB exists");
        return db;
    }
    try{
        const client = await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });
        console.log(client.db(process.env.DB_NAME));
        //db = client.db(process.env.DB_NAME);
        debug("DB should be connected");
        return db;
    }catch(err){
        debug(err);
    }
}