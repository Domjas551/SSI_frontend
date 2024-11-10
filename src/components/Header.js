// components/Header.js
import React from 'react';
import '../stylesheets/Header.css';
import {Link} from "react-router-dom";

function Header(props) {

    return (
        <header className="header">
            <a href="/" className="home-link">MagWork</a>
            {props.back!==undefined?<Link to={props.back}>Return</Link> : null}
            <a href="/" className="login-link">Zaloguj</a>
        </header>
    );
}

export default Header;
