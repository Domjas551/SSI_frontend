import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import ModularUserContetnList from "./ModularUserContetnList";
import UserEditSidebar from "./UserEditSidebar";
import {useNavigate} from "react-router-dom";

function UserEditSelect(){

    const navigate=useNavigate();

    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null)

    async function getUsers(){

        await fetch("/users")
            .then(res => {

                if(res.ok){
                    return res.json()
                }else{

                    let message;

                    if(res.statusText=="Internal Server Error"){
                        message="Nie można połączyć się z serwerem"
                    }

                    setError(message)
                }

            })
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
            .then(res => {

                if(res.ok){
                    return res.json()
                }else{

                    let message;

                    if(res.statusText=="Internal Server Error"){
                        message="Nie można połączyć się z serwerem"
                    }

                    setError(message)
                }
            })
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

    useEffect( () => {

        if(sessionStorage.getItem("uprawnienia")!=1){
            navigate('/', {replace:false})
        }

        getUsers();
    }, []);


    return (

        <div className="App">
            {//Blok do przenoszenia na strone z błędami
            }
            {error? navigate('/error', {state:{error: error}}, {replace:true}): null}
            <Background />
            <Header back={`/admin`}/>
            <UserEditSidebar  getFilteredUsers={getFilteredUsers}/>
            { users ? <ModularUserContetnList users={users}/> : null }
        </div>
    )

}

export default UserEditSelect;