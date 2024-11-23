import React from "react";
import Background from "./Background";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

function Login(){

    return(
        <div className="App">
            <Background />
            <LoginHeader />
            <LoginForm />
        </div>
    )

}

export default Login;