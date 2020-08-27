import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/_Header.scss';

function Header({ isLoggedin, setLoggedin }) { //eslint-disable-line
    return (
        <header>
            <div className="image-container">
                <a href="/"> <img src="https://freesvg.org/img/Prismatic-Perforated-Mandala-No-Background.png" alt="armando-logo" /> </a>
            </div>
            <h1>{"Armando's Blog"}</h1>
            <Nav isLoggedin={isLoggedin} setLoggedin={setLoggedin} />
        </header>
    );
}

function Nav({isLoggedin, setLoggedin}) { //eslint-disable-line
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/">Posts</Link></li>
                    {(isLoggedin ?
                        <>
                            <li><Link to="/createpost">Create Post</Link></li>
                            <li><Link to="/account">Account</Link></li>
                        </>
                    : '')}
                </ul>
                {// Find out a way to insert this here? <SigninBox isLoggedin={isLoggedin} setLoggedin={setLoggedin}/>
                }
            </nav>
            <SigninBox isLoggedin={isLoggedin} setLoggedin={setLoggedin}/>
        </>
    );
}

function SigninBox({isLoggedin, setLoggedin}) {//eslint-disable-line

    function handleLogout(){
        const response = confirm('Are you sure you want to log out?')
        if(response){
            setLoggedin(false);
            alert('You have been logged out');
        }
    }

    return isLoggedin ? (
        <div className="signinBox" onClick={handleLogout}>
            <Link to="/">Signout</Link>
        </div>
    ) : (
            <div className="signinBox">
                <Link to="/signin">Sign In</Link>
            </div>
        )
}


export default Header;


