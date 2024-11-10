import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import ModularContentButton from "./ModularContentButton";

function AdminMain(props){

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

    return(
        <div className="App">
            <Background />
            <Header />
            <ModularContentButton options={options} />
        </div>
    )

}

export default AdminMain;