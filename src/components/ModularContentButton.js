import React, {Component} from "react";
import '../stylesheets/MainContentButtonChoice.css';
import {Link} from "react-router-dom";

class ModularContentButton extends Component{

    render() {
        return (
            <main className="main-content">
                <div className="content-container">
                    <h1 className="heading">Wybór działania</h1>
                    <div className="button-container">
                        {this.props.options.map(item => (
                            <Link to={item.link}><button><i className={item.id}></i>{item.name}</button></Link>
                        ))}
                    </div>
                </div>
            </main>
        );
    }
}

export default ModularContentButton;