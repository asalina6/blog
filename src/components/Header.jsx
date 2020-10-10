import React from 'react';
import { Link } from 'react-router-dom';
import Welcome from './Welcome.jsx';
import '../scss/Header.scss';
import '../scss/_Nav.scss';

function Header({ isLoggedIn, setIsLoggedIn, setToken, userFirstName, userLastName }) { //eslint-disable-line
    return (
        <>
            <Welcome userFirstName={userFirstName} userLastName={userLastName} isLoggedIn={isLoggedIn}/>
            <header>
                <div className="image-container">
                    <a href="/"> <img src="https://freesvg.org/img/Prismatic-Perforated-Mandala-No-Background.png" alt="armando-logo" /> </a>
                </div>
                <div className="title-container">
                    <h1>{"Armando's Blog"}</h1>
                </div>
                <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken}/>
            </header>
        </>
    );
}

function Nav({ isLoggedIn, setIsLoggedIn, setToken}) { //eslint-disable-line
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/">Posts</Link></li>
                    {(isLoggedIn ?
                        <>
                            <li><Link to="/createpost">Create Post</Link></li>
                            <li><Link to="/account">Account</Link></li>
                        </>
                        : '')}
                </ul>
                {// Find out a way to insert this here? <SigninBox isLoggedin={isLoggedin} setLoggedin={setLoggedin}/>
                }
            </nav>
            <SigninBox setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </>
    );
}

function SigninBox({ isLoggedIn, setIsLoggedIn, setToken }) {//eslint-disable-line
    function handleLogout() {
        //IIFE that will fetch logout, turn the response to json, and then
        //will decide what to do.
        (async function logout() {
            try {
                const response = await fetch('http://localhost:3001/auth/logout',{
                    credentials: 'include'
                });
                const responseJSON = await response.json();
                if (responseJSON.logout === 'success') {
                    localStorage.removeItem('jwt');
                    setIsLoggedIn(false);
                    setToken('');
                }
            } catch (err) {
                console.log(err);
                alert('Error has occured');
            }
        }());
    }

    return isLoggedIn ? (
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


