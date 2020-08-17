import { connectDB } from './connect-mongodb';
const dotenv = require('dotenv');
dotenv.config({path: '../../credentials.env'});

export default function(){
    const md5 = require('md5'); 
    //Sanitation is handled by React. We just need to verify password hash and username
    let attemptedUsername='armandosalinasiiiarizona@gmail.com';
    let attemptedPassword="password";
    let authenticated = false;

    let attemptedPasswordhash = md5(attemptedPassword);

    //Begin query

    (async function authenticateUser(){
        try{
            let db = await connectDB();
            let users = await db.collection(process.env.USERS);
            if(users.find(
                    { email: {$eq: attemptedUsername}},
                    { password: {$eq: attemptedPasswordhash}}
                ).count() === 1){
                authenticated=true;
                console.log("Hey it was authenticated as: ", authenticated);
                }
            console.log("Hey it was authenticated as: ", authenticated);
            return authenticated;

        }catch(err){
            console.log(err);
        }
        //might include finally caluse to close the connection to the client;
    }());
}