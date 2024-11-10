import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import UserEditForm from "./UserEditForm";

function UserEdit(){

    const [user, setUser] = useState(null);

    async function getUser(){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: window.location.pathname.substring(21,) })
        };

        await fetch("/user",requestOptions)
            .then(res => res.json())
            .then((json) => {
                setUser(json[0])
            })
            .catch((error)=>{
                console.log('Data fetching error.',error)
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    return(
        <div className="App">
            <Background />
            <Header back={`/admin/userEdit`}/>
            { user ? console.log(user) : null }
            { user ? <UserEditForm user={user} /> : null }
        </div>
    )

}

export default UserEdit;