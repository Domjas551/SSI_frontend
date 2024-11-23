import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import ModularContentButton from "./ModularContentButton";
import {useNavigate} from "react-router-dom";

function AdminMain(){

    const navigate=useNavigate();

    const [options, setOptions]=useState([
        {
            id: 1,
            name: "Dodaj pracownika",
            link: "/admin/userAdd"
        },
        {
            id: 2,
            name: "Dodaj typ zadań",
            link: "/admin/taskTypeAdd"
        },
        {
            id: 3,
            name: "Edytuj konta pracowników",
            link: "/admin/userEdit"
        }
    ])

    useEffect(() => {
        if(sessionStorage.getItem("uprawnienia")!=1){
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

export default AdminMain;