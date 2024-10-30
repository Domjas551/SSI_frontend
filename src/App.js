// App.js
import React, { useEffect } from 'react';
import './stylesheets/App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import MainContent from './components/MainContentButtonChoice';
import Background from './components/Background';
import Sidebar from './components/Sidebar';
import ContentList from './components/ContentList'; // Import the ContentList component

function App() {
    const getTypes = () => {
        fetch("/type")
            .then(res => res.json())
            .then(json => console.log(json));
    }

    const sendData = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        };
        fetch('/post', requestOptions)
            .then(response => response.json())
            .then(json => console.log(json.message));
    }

    useEffect(() => {
        sendData();
    }, []);

    /*
    //Strona z przyciskami
    return (
        <div className="App">
            <Background />
            <Header />
            <Navbar />
            <MainContent />
        </div>
    );
*/
    //Strona do wyszukiwań
    return (
        <div className="App">
            <Background />
            <Header />
            <Navbar />
            <Sidebar />
            <ContentList />
        </div>
    );
}

export default App;
