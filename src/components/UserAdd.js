import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Background from "./Background";
import Header from "./Header";
import UserAddForm from "./UserAddForm";

function UserAdd(){

    const navigate=useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("uprawnienia")!=1){
            navigate('/', {replace:false})
        }
    }, []);

    return(
        <div className="App">

            <Background />
            <Header back={`/admin`}/>
            <UserAddForm />
        </div>
    )
}

export default UserAdd;