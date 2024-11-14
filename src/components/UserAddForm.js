import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function UserAddForm(){
    const navigate=useNavigate();

    const [error, setError] = useState(null);
    const [emails, setEmails] = useState(null);

    async function getEmails(){

        await fetch("/admin/userAdd")
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

                    let emails=[];

                    for (let i = 0; i < json.length; i++) {
                        emails.push(json[i].email)
                    }

                    setEmails(emails);
                }

            })
            .catch((error)=>{
                console.log('Data fetching error.',error)

            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let name=event.target.name.value;
        let surname=event.target.surname.value;
        let email=event.target.email.value;
        let phone=event.target.phone.value;
        let pass=event.target.password.value;
        let position=event.target.position.value;

        if(emails.includes(email)){
            alert("Podany email jest już w użyciu")
        }else{
            addUser(name,surname,pass,email,phone,position);
            console.log(emails)
        }

    };

    async function addUser(name, surname, password, email, number, position) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                surname: surname,
                password: password,
                email: email,
                phone: number,
                position: position
            })
        };

        await fetch("/admin/userAdd", requestOptions)
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
                    setEmails(json);
                    alert("Dodano nowego użytkownika")
                    window.location.reload(true)
                }

            })
            .catch((error) => {
                console.log('Data fetching error.', error);
            });
    };

    useEffect( () => {
        getEmails();
    }, []);

    return (
        <main className="form_main-content">
            {//Blok do przenoszenia na strone z błędami
            }
            {error? navigate('/error', {state:{error: error}}, {replace:true}): null}
            <div className="form_content-container">
                <h1 className="form_heading">Edycja danych</h1>
                <form onSubmit={handleSubmit}>
                    <p>Imię</p>
                    <input name="name" type="text" placeholder="Imię" pattern={"[A-Z]{1}[a-z]*"}/>
                    <p>Nazwisko</p>
                    <input name="surname" type="text" placeholder="Nazwisko" pattern={"[A-Z]{1}[a-z]*"}/>
                    <p>Email</p>
                    <input name="email" type="email" placeholder="Email"/>
                    <p>Numer telefonu</p>
                    <input name="phone" type="text" placeholder="Numer telefonu" pattern={"[0-9]{9}"}/>
                    <p>Hasło</p>
                    <input name="password" type="text" placeholder="Hasło" pattern={"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,20}"}/>
                    <p>Pozycja</p>
                    <select name="position" defaultValue={"pracownik"}>
                        <option value="pracownik">Pracownik</option>
                        <option value="kierownik">Kierownik</option>
                        <option value="administrator">Administrator</option>
                    </select>
                    <div className="form_button_container">
                        <button type="submit" className="form_button">Dodaj</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default UserAddForm;