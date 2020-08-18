import React, { useState } from 'react';
import '../scss/_LoginPage.scss';

function Login(props) { //eslint-disable-line

    const [username, setUsername] = useState(''); //eslint-disable-line
    const [password, setPassword] = useState(''); //eslint-disable-line

    function submitHandler(e) {
        e.preventDefault();
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
                console.log(response);
            }).catch((err) => { console.error('Fetch was not successful: ', err) });
    }

    return (
        <main className="form-container" onSubmit={submitHandler} method="post" >
            <form method="post">
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
                <button type="submit">Submit</button>
            </form>
        </main>
    );
}

export default Login;