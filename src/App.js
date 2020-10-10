import React, {useState, useEffect} from 'react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import CreatePost from './components/CreatePost.jsx';
import './scss/styles.scss';


function App(props) { //eslint-disable-line
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const [token, setToken] = useState('');

    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');


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

    useEffect(()=>{
        console.log('In use effect the current token is :', token);
        (async function verifyToken(_token){
            console.log("This is stringified _token",JSON.stringify({_token}) );
            if(_token !== ''){
                const response = await fetch('http://localhost:3001/auth/jwtverify',{
                    method: 'POST',
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({_token})
                });

                checkErrors(response);
                const responseJSON =  await response.json();
                if(responseJSON.status === 'success'){
                    setUserEmail(responseJSON.email);
                    setUserId(responseJSON.id);
                    setUserFirstName(responseJSON.firstName);
                    setUserLastName(responseJSON.lastName);
                }
            }
        }(token));

    },[token]);

    return (
        <>
                <Header userFirstName={userFirstName}
                        userLastName={userLastName}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        setToken={setToken}/>
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route path="/signin">
                        <LoginPage setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/register">
                        <SignUpPage setIsLoggedIn={setIsLoggedIn} setToken={setToken}/>
                    </Route>
                    <Route path="/createPost">
                        <CreatePost isLoggedIn={isLoggedIn}/>
                    </Route>
                    <Route>
                        <PageNotFound />
                    </Route>
                </Switch>
                <Footer />
        </>
    );
}

App.propTypes = {
    signedIn: PropTypes.bool.isRequired,
}
App.defaultProps = {
    signedIn: false,
}

export default App;