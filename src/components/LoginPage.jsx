import React, { useState } from 'react';
import '../scss/_LoginPage.scss';
import { Redirect, Link } from 'react-router-dom'; //eslint-disable-line

function LoginPage({ setIsLoggedIn, setToken }) { //eslint-disable-line

    const [email, setEmail] = useState(''); //eslint-disable-line
    const [password, setPassword] = useState(''); //eslint-disable-line
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [emailError, setEmailError] = useState('');//eslint-disable-line
    const [passwordError, setPasswordError] = useState('');//eslint-disable-line


    function checkErrors(response){
        //if the response was not okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //We make sure the content type of the response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("Oops, we haven't got JSON!");
        }
    }

    function submitHandler(e) {
        e.preventDefault();

        //going to need usestate to update.

        (async function fetchLogin() {
            try {
                //posting the login information, waiting for response
                const response = await fetch('http://localhost:3001/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, password })
                });
                
                checkErrors(response);
                //This is the JSON of the response
                const responseJSON = await response.json();
                console.log("This is the json of the response:", responseJSON);
                //if there is a success property in the object, do this
                if (responseJSON.success === 'success') {
                    const token = responseJSON.token;
                    setToken(token);
                    localStorage.setItem('jwt', token);
                    setIsLoggedIn(true);
                    setShouldRedirect(true);
                }
                //if the response is an (error) array, do this
                if (Array.isArray(responseJSON)) {
                    console.log('error');
                    //handle errors here with the state...
                }

            } catch (err) {
                console.error('fetch errored: ', err)
            }
        }());
    }

    return !shouldRedirect ? (
        <main className="form-container" onSubmit={submitHandler} method="post" >
            <div className="outside-box">
                <form method="post">
                    <h1>Sign in to Continue</h1>

                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className="emailError error">
                        {emailError}
                    </div>

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        onChange={e => setPassword(e.target.value)} />
                    <div className="passwordError error">
                        {passwordError}
                    </div>
                    <div className="remember-forgot-box">
                        <div className="remember">
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit" disabled={!(email && password)}>Submit</button>
                    <div className="register-box">
                        Need an account? <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </main>
    ) : (
            <Redirect to="/"></Redirect>
        );

}

export default LoginPage;