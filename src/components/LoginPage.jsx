import React, { useState } from 'react';
import '../scss/_LoginPage.scss';

function Login(props) { //eslint-disable-line

    const [username, setUsername] = useState(''); //eslint-disable-line
    const [password, setPassword] = useState(''); //eslint-disable-line


    return (
        <main className="form-container" >
            <form method="post" action="/auth/login">
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