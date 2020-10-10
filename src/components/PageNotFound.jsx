import React from 'react';
import { Link } from 'react-router-dom';
import image404 from '../images/vincent-van-zalinge-4B5F388MLE4-unsplash.jpg';
import '../scss/PageNotFound.scss';

function PageNotFound(props){ //eslint-disable-line
    return(
        <main className="pagenotfound">
            <h1>Error 404, How Awkard!</h1>
            <div className="image-container">
                <img src={image404} alt="monkey making funny face"/>
            </div>
            <p>We cannot find the page you are looking for!</p>
            <Link to="/">Try going to our Home Page</Link>
        </main>
    )
}

export default PageNotFound;