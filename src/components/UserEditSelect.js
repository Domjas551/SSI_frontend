import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ModularContetnList from "./ModularContetnList";

function UserEditSelect(){

    const [users, setUsers] = useState(null);

    async function getUsers(){

        await fetch("/users")
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                setUsers(json)
                console.log(users)
            })
            .catch((error)=>{
                console.log('Data fetching error.',error)
            });
    };

    useEffect( () => {
        getUsers();
    }, []);


    return (
        <div className="App">
            <Background />
            <Header />
            <Sidebar />
            { users ? <ModularContetnList users={users}/> : null }
        </div>
    )

}

export default UserEditSelect;