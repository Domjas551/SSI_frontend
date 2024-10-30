// components/Header.js
import React from 'react';
import '../stylesheets/Header.css';

function Header() {
    return (
        <header className="header">
            <a href="/" className="home-link">MagWork</a>
            <a href="/" className="login-link">Zaloguj</a>
        </header>
    );
}

export default Header;
