import React from 'react';
import { Link } from 'react-router-dom';

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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a href="#">Posts</a></li>
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
                <Link to="/signin">Sign In / Sign Up</Link>
            </div>
        );
    } else{
        return(
            <div className="signinBox">
                <Link to="/signout">Signout</Link>
            </div>
        );
    }
}

export default Header;


