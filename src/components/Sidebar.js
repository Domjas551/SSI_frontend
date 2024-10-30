// components/Sidebar.js
import React from 'react';
import '../stylesheets/Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <h3>Input Form</h3>
            <div className="form-group">
                <label htmlFor="textInput1">Text Input 1:</label>
                <input type="text" id="textInput1" placeholder="Enter text..."/>
            </div>
            <div className="form-group">
                <label htmlFor="textInput2">Text Input 2:</label>
                <input type="text" id="textInput2" placeholder="Enter text..."/>
            </div>
            <div className="form-group">
                <label htmlFor="dropdown1">Dropdown 1:</label>
                <select id="dropdown1">
                    <option value="">Select an option...</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="dropdown2">Dropdown 2:</label>
                <select id="dropdown2">
                    <option value="">Select an option...</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>
            </div>
            <div className="form-group">
                <label>
                    <input type="checkbox" id="checkbox1"/>
                    Checkbox 1
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input type="checkbox" id="checkbox2"/>
                    Checkbox 2
                </label>
            </div>
        </div>
    );
}

export default Sidebar;
