import React, { useEffect } from 'react';

function LogOutPage({ setLoggedin }) { //eslint-disable-line

    function checkErrors(response) {
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

    useEffect(() => {
        async function logout() {
            try {
                const response = await fetch('http://localhost:3001/auth/logout');
                checkErrors(response);
                const responseJSON = await response.json();
                if (responseJSON.success === 'success') {
                    setLoggedin(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        logout();
    }, []);

    return (<h1>Logging Out</h1>);
}

export default LogOutPage;