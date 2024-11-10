import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import ModularContetnList from "./ModularContetnList";
import UserEditSidebar from "./UserEditSidebar";
import {useNavigate} from "react-router-dom";

function UserEditSelect(){

    const navigate=useNavigate();

    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null)

    async function getUsers(){

        await fetch("/users")
            .then(res => res.json())
            .then((json) => {

                if(json[0].error!=null){
                    //obsługa błędów przesyłanych z backendu
                    setError(json[0].error);
                }else{
                    setUsers(json);
                }

            })
            .catch((error)=>{
                console.log('Data fetching error.',error)

            });
    };

    async function getFilteredUsers(query=null){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        };

        await fetch("/users", requestOptions)
            .then(res => res.json())
            .then((json) => {
                setUsers(json);
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
            {//Blok do przenoszenia na strone z błędami
            }
            {error? navigate('/error', {state:{error: error}}): null}
            <Background />
            <Header back={`/admin`}/>
            <UserEditSidebar  getFilteredUsers={getFilteredUsers}/>
            { users ? <ModularContetnList users={users}/> : null }
        </div>
    )

}

export default UserEditSelect;