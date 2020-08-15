import { connectDB } from './connect-mongodb.js';
const defaultState = require('../mockMongoData.js');
console.log(defaultState);

(async function initializeDB(){
    try{
        let db = await connectDB();
        let user = await db.collection('users').findOne({authorId:1});
        if(!user){
            for(let collectionName in defaultState){
                let collection =  db.collection(collectionName);
                await collection.insertMany(defaultState[collectionName]);
            }
        }else{
            console.log("Main user exists");
        }
    }catch(err){
        console.log(err);
    }

}());