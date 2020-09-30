import React, { useState } from 'react';
import '../scss/_SignUpPage.scss';
import { Redirect } from 'react-router-dom'; //eslint-disable-line

function SignUpPage({ setLoggedin, setToken }) { //eslint-disable-line

    const [email, setEmail] = useState(''); //eslint-disable-line
    const [password, setPassword] = useState(''); //eslint-disable-line
    const [confirmPassword, setConfirmPassword] = useState(''); //eslint-disable-line
    const [firstName, setFirstName] = useState(''); //eslint-disable-line
    const [lastName, setLastName] = useState(''); //eslint-disable-line

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const [emailError, setEmailError] = useState('');//eslint-disable-line
    const [passwordError, setPasswordError] = useState('');//eslint-disable-line
    const [confirmPasswordError, setConfirmPasswordError] = useState('');//eslint-disable-line
    const [firstNameError, setFirstNameError] = useState('');//eslint-disable-line
    const [lastNameError, setLastNameError] = useState('');//eslint-disable-line



    function checkErrors(response) {
        //if the response was not okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //We make sure the content type of the response is JSON
        const contentType = response.headers.get('content-type');
        console.log(contentType);
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("Oops, we haven't got JSON!");
        }
    }

    function submitHandler(e) {
        e.preventDefault();

        //going to need usestate to update.

        (async function post_signup() {
            try {
                //posting the login information, waiting for response
                const response = await fetch('http://localhost:3001/auth/signup', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ firstName, lastName, email, password, confirmPassword })
                });
                checkErrors(response);
                //This is the JSON of the response
                const responseJSON = await response.json();
                console.log("This is the json of the response:", responseJSON);
                //if there is a success property in the object, do this
                if (responseJSON.success === 'success') {
                    const token = responseJSON.token;
                    localStorage.set('jwt',token);
                    setToken(token)
                    setLoggedin(true);
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
        <main className="form-container" onSubmit={submitHandler}>
            <div className="outside-box">
                <form>
                    <h1>Sign Up</h1>

                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter First Name"
                        required
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <div className="firstNameError error">
                        {firstNameError}
                    </div>

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter Last Name"
                        required
                        onChange={e => setLastName(e.target.value)}
                    />
                    <div className="lastNameError error">
                        {lastNameError}
                    </div>

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
                    <label htmlFor="confirmPassword">Re-enter Your Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Re-enter password"
                        required
                        onChange={e => setConfirmPassword(e.target.value)} />
                    <div className="passwordError error">
                        {confirmPasswordError}
                    </div>
                    <button type="submit" disabled={!(email && password && confirmPassword && firstName && lastName)}>Submit</button>
                </form>
            </div>
        </main>
    ) : (
            <Redirect to="/"></Redirect>
        );

}

export default SignUpPage;
