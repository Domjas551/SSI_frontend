import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";

function LoginForm(){

    const navigate=useNavigate();

    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    async function login(email, password) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: password,
                email: email
            })
        };

        await fetch("/login", requestOptions)
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
                    //todo uzupełnić przenoszenia na strone
                    //json[0].email - email zalogowanego konta do wykorzystania

                    if(json[0].uprawnienia==-1){
                        setErrorMessage("Podano niepoprawne dane");
                    }else if(json[0].uprawnienia==3){
                        //zmienna sesyjna przechowująca uprawnienia użytkownika
                        sessionStorage.setItem("uprawnienia",3);
                    }else if(json[0].uprawnienia==2){
                        //zmienna sesyjna przechowująca uprawnienia użytkownika
                        sessionStorage.setItem("uprawnienia",2);
                        navigate('/manager', {replace:false})
                    }else if(json[0].uprawnienia==1){
                        //zmienna sesyjna przechowująca uprawnienia użytkownika
                        sessionStorage.setItem("uprawnienia",1);
                        navigate('/admin', {replace:false})
                    }
                }

            })
            .catch((error) => {
                console.log('Data fetching error.', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let email=event.target.email.value;
        let pass=event.target.password.value;

        login(email,pass);

    };


    return (
        <main className="form_main-content">
            {//Blok do przenoszenia na strone z błędami
            }
            {error? navigate('/error', {state:{error: error}}, {replace:true}): null}
            <div className="form_content-container">
                <h1 className="form_heading">Logowanie</h1>
                {errorMessage?<p>{errorMessage}</p>:null}
                <form onSubmit={handleSubmit}>
                    <p>Email</p>
                    <input name="email" type="email" placeholder="Email" required/>
                    <p>Hasło</p>
                    <input name="password" required type="password" placeholder="Hasło" pattern={"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,20}"}/>
                    <div className="form_button_container">
                        <button type="submit" className="form_button">Zaloguj</button>
                    </div>
                </form>
            </div>
        </main>
    );

}

export default LoginForm;