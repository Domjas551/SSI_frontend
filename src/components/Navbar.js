// components/Navbar.js
import React from 'react';
import '../stylesheets/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <a href="#option1">Zakładka 1</a>
            <a href="#option2">Zakładka 2</a>
            <a href="#option3">Zakładka 3</a>
            <a href="#option4">Zakładka 4</a>
        </nav>
    );
}

export default Navbar;
