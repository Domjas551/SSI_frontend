import React from "react";
import '../stylesheets/MainContentButtonChoice.css';
import {Link} from "react-router-dom";

function ModularContentButton(props){

    return (
        <main className="main-content">
            <div className="content-container">
                <h1 className="heading">Wybór działania</h1>
                <div className="button-container">
                    {props.options.map(item => (
                        <Link to={item.link}><button><i className={item.id}></i>{item.name}</button></Link>
                    ))}
                </div>
            </div>
        </main>
    );

}

export default ModularContentButton;