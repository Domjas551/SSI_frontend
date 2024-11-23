import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Background from "./Background";
import Header from "./Header";
import TaskAddForm from "./TaskAddForm";

function TaskAdd(){

    const navigate=useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("uprawnienia")!=2){
            navigate('/', {replace:false})
        }
    }, []);

    return(
        <div className="App">
            <Background />
            <Header back={`/manager`}/>
            <TaskAddForm />
        </div>
    )
}

export default TaskAdd;