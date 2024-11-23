import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import ModularContentButton from "./ModularContentButton";
import {useNavigate} from "react-router-dom";

function ManagerMain(props){
    const navigate=useNavigate();
    const [options, setOptions]=useState([
        {
            id: 1,
            name: "Dodaj zadanie",
            link: "/manager/TaskAdd"
        },
        {
            id: 2,
            name: "Modyfikuj zadanie",
            link: "/manager/TaskEdit"
        },
        {
            id: 3,
            name: "Przydziel zadanie",
            link: "/manager/TaskAssign"
        }
    ])

    useEffect(() => {
        if(sessionStorage.getItem("uprawnienia")!=2){
            navigate('/', {replace:false})
        }
    }, []);

    return(
        <div className="App">
            <Background />
            <Header />
            <ModularContentButton options={options} />
        </div>
    )

}

export default ManagerMain;