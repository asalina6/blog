import React from 'react';

function Welcome({userFirstName, userLastName, isLoggedIn}){

    console.log('Inside welcome: ', userFirstName,userLastName);
    return(
        isLoggedIn? (<div className="welcome-box">
            <h1>Welcome {userFirstName} {userLastName} </h1>
        </div>) : null
    );
}

export default Welcome;