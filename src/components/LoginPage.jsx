import React, { useState } from 'react';
import '../scss/_LoginPage.scss';
import { Redirect, BrowserRouter } from 'react-router-dom'; //eslint-disable-line

function Login(props) { //eslint-disable-line

    const [username, setUsername] = useState(''); //eslint-disable-line
    const [password, setPassword] = useState(''); //eslint-disable-line
    const [errorsList, setErrorsList] = useState([]); //eslint-disable-line

    function submitHandler(e) {
        e.preventDefault();

        (async function fetchLogin(){
            try{
                const response = await fetch('http://localhost:3001/auth/login', {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }

                const responseJSON = await response.json();
                console.log(responseJSON);
                if(responseJSON.success === 'success'){
                    console.log('success');
                }
                if(responseJSON.error === 'invalid credentials'){
                    console.log('invalid credientials');
                }

            }catch(err){
                console.error('fetch errored: ', err)
            }
        }());
        /*
         fetch('http://localhost:3001/auth/login', {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const contentType = response.headers.get('content-type');
                console.log(contentType);
                console.log(response.statusText);
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }
                return response.json()
            }).then((response) => {
                if(response.success === 'success'){
                    <BrowserRouter>
                        <Redirect push to="/losers"/>
                    </BrowserRouter>
                }
                if(response.error === 'invalid credentials'){
                    setErrorsList([...errorsList, response.error]);
                }
            }).catch((err) => { console.error('Fetch was not successful: ', err) });
            */
    }

    return (
        <main className="form-container" onSubmit={submitHandler} method="post" >
            <div className="outside-box">
                <form method="post">
                    <div className="errors">
                        {errorsList.map( (error) => {
                            `<div className=error>
                                ${error}
                             </div>`
                        })}
                    </div>
                    <h1>Sign in to Continue</h1>
                    <label htmlFor="username">Username</label>
                    <input
                        type="email"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        required
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        onChange={e => setPassword(e.target.value)} />
                    <div className="remember-forgot-box">
                        <div className="remember">
                            <input type="checkbox" id="remember" name="remember"/>
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit">Submit</button>
                    <div className="register-box">
                        Need an account? <a href="#">Register</a>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Login;