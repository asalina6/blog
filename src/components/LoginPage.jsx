import React from 'react';
import '../scss/_LoginPage.scss';

function Login(props){ //eslint-disable-line
    return(
        <main className="form-container">
            <form action="loginverification" method="post">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter username" required/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password" required/>
                <button type="submit">Submit</button>
            </form>
        </main>
    );
}

export default Login;