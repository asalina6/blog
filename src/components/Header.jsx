import React from 'react';

function Header(props){
    return(
        <header>
        <div class="image-container">
            <img src="https://freesvg.org/img/Prismatic-Perforated-Mandala-No-Background.png" alt="armando-logo"/>
        </div>
        <h1>Armando's Blog</h1>
        <Nav/>
        </header>
    );
}

function Nav(props){
    return(
        <nav>
            <ul>
                <li><a href="#"></a></li>
            </ul>
        </nav>
    );
}

export default Header;


