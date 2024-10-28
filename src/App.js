import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";

function App() {

  const getTypes= ()=>{
    fetch("/type")
        .then(res=>res.json())
        .then(json => console.log(json))
  }

  const sendData= ()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch('/post', requestOptions)
        .then(response => response.json())
        .then(json=>console.log(json.message));


  }

  useEffect(() => {
    //getTypes();
    sendData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
