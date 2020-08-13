import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
let db = null;

export async function connectDB(){
    if(db){
        console.log("DB exists");
        return db;
    }
    let client;
    try{
        client = await MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db('armandoblog');
        console.log("Got DB", db);
        return db;
    }catch(err){
        console.log(err);
    }
}