import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import UserEditForm from "./UserEditForm";
import {useNavigate} from "react-router-dom";

function UserEdit(){

    const navigate=useNavigate();

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    async function getUser(){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: window.location.pathname.substring(21,) })
        };

        await fetch("/user",requestOptions)
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
                if(json[0]==undefined){
                    setError("Użytkownik o danym id nie istnieje")
                }else if(json[0].error!=null){
                    //obsługa błędów przesyłanych z backendu
                    setError(json[0].error);
                }else {
                    setUser(json[0]);
                }

            })
            .catch((error)=>{
                console.log('Data fetching error.',error)
            });
    };

    useEffect(() => {

        if(sessionStorage.getItem("uprawnienia")!=1){
            navigate('/', {replace:false})
        }

        getUser();
    }, []);

    return(
        <div className="App">
            {//Blok do przenoszenia na strone z błędami
            }
            {error? navigate('/error', {state:{error: error}}, {replace:true}): null}
            <Background />
            <Header back={`/admin/userEdit`}/>
            { user ? <UserEditForm user={user} /> : null }
        </div>
    )

}

export default UserEdit;