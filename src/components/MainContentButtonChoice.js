// components/MainContentButtonChoice.js
import React from 'react';
import '../stylesheets/MainContentButtonChoice.css';

function MainContentButtonChoice() {
    return (
        <main className="main-content">
            <div className="content-container">
                <h1 className="heading">Wybór działania</h1>
                <div className="button-container">
                    <button><i className="b1"></i> Przycisk 1 </button>
                    <button><i className="b2"></i> Przycisk 2 </button>
                    <button><i className="b3"></i> Przycisk 3 </button>
                    <button><i className="b4"></i> Przycisk 4 </button>
                    <button><i className="b5"></i> Przycisk 5 </button>
                    <button><i className="b6"></i> Przycisk 6 </button>
                </div>
            </div>
        </main>
    );
}

export default MainContentButtonChoice;
