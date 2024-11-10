import React, { useState } from "react";
import '../stylesheets/EditForm.css';

function UserEditForm(props) {
    const [user, setUser] = useState(props.user);

    const handleSubmit = (event) => {
        event.preventDefault();

        updateUsers(
            event.target.name.value,
            event.target.surname.value,
            event.target.position.value,
            event.target.is_active.value
        );
    };

    async function updateUsers(name, surname, position, is_active) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: window.location.pathname.substring(21),
                name: name,
                surname: surname,
                position: position,
                is_active: is_active
            })
        };

        await fetch("/user", requestOptions)
            .then(res => res.json())
            .then((json) => {
                setUser(json);
                alert("Edycja danych przebiegła pomyślnie");
            })
            .catch((error) => {
                console.log('Data fetching error.', error);
            });
    };

    return (
        <main className="form_main-content">
            <div className="form_content-container">
                <h1 className="form_heading">Edycja danych</h1>
                <form onSubmit={handleSubmit}>
                    <p>Imię</p>
                    <input name="name" type="text" placeholder="Imię" defaultValue={user.name} />
                    <p>Nazwisko</p>
                    <input name="surname" type="text" placeholder="Nazwisko" defaultValue={user.surname} />
                    <p>Pozycja</p>
                    <select name="position" defaultValue={user.position}>
                        <option value="pracownik">Pracownik</option>
                        <option value="kierownik">Kierownik</option>
                        <option value="administrator">Administrator</option>
                    </select>
                    <p>Czy aktywny</p>
                    <select name="is_active" defaultValue={user.is_active}>
                        <option value={1}>Active</option>
                        <option value={0}>Unactive</option>
                    </select>
                    <div className="form_button_container">
                        <button type="submit" className="form_button">Zatwierdź</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default UserEditForm;
