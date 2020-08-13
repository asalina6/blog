import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import PropTypes from 'prop-types';
import './scss/styles.scss';

function App(props){ //eslint-disable-line
    
    const [loggedIn, setLogin] = useState(false);
    const login = () => setLogin(o => !o);

    return(
        <>
            <Header/>
            <Main/>
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