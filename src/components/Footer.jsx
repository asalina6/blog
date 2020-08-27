import React from 'react';
import '../scss/_Footer.scss';

function Footer(props){ //eslint-disable-line
    return(
        <footer>
        <div className="top-footer">
        <div className="left-side">
                <ul className="">
                    <li className=""><a href="https://twitter.com/Sal_Arman_" className=""><i className="fab fa-twitter" title="Twitter"></i></a></li>
                    <li className=""><a href="https://www.facebook.com/Ay.Jay.Salinas" className=""><i className="fab fa-facebook-square" title="Facebook"></i></a></li>
                    <li className=""><a href="https://github.com/asalina6" className=""><i className="fab fa-github-square" title="Github"></i></a></li>
                    <li className=""><a href="https://www.linkedin.com/in/armando-salinas-iii-68b5006b/" className=""><i className="fab fa-linkedin" title="Linkedin"></i></a></li>
                </ul>
            </div>
        </div>
        <div className="bottom-footer">
            <small>Copyright 2020. Armando Salinas</small>
        </div>

        </footer>
    );
}

export default Footer;