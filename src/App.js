import React from 'react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import './scss/styles.scss';

function App(props) { //eslint-disable-line

    //const [loggedIn, setLogin] = useState(false);
    //const login = () => setLogin(o => !o);

    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/signin">
                    <LoginPage />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route>
                    <PageNotFound/>
                </Route>
            </Switch>
            <Footer/>
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