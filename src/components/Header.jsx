import React from 'react';

function Header({signedIn}){ //eslint-disable-line
    return(
        <header>
        <div className="image-container">
            <img src="https://freesvg.org/img/Prismatic-Perforated-Mandala-No-Background.png" alt="armando-logo"/>
        </div>
        <h1>{"Armando's Blog"}</h1>
        <Nav signedIn={signedIn}/>
        </header>
    );
}

function Nav({signedIn}){ //eslint-disable-line
    return(
        <>
            <nav>
                <ul>
                    <li><a href="#"></a></li>
                </ul>
            </nav>
           <SigninBox signedIn={signedIn}/>
        </>
    );
}

function SigninBox({signedIn}){
    if(!signedIn){
        return(
            <div className="signinBox">
                SignIn
            </div>
        );
    } else{
        return(
            <div className="signinBox">
                SignOut
            </div>
        );
    }
}

export default Header;


