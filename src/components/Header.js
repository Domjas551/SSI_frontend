// components/Header.js
import React from 'react';
import '../stylesheets/Header.css';
import {Link, useNavigate} from "react-router-dom";

function Header(props) {

    const navigate=useNavigate();

    const handleClick = (event) => {

        sessionStorage.removeItem("uprawnienia");
        navigate('/', {replace:false})

    };

    return (
        <header className="header">
            <a href="/" className="home-link">MagWork</a>
            {props.back !== undefined ? <Link to={props.back} className="back-link">Powrót</Link> : null}
            <button onClick={handleClick}>Wyloguj</button>
        </header>
    );
}

export default Header;
