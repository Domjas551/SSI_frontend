import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Background from "./Background";
import Header from "./Header";
import ModularUserContetnList from "./ModularUserContetnList";
import ModularTaskTypeContetnList from "./ModularTaskTypeContentList";
import TaskTypeAddSidebar from "./TaskTypeAddSidebar";

function TaskTypeAdd(){

    const navigate=useNavigate();

    const [taskTypes, setTaskTypes] = useState(null);
    const [error, setError] = useState(null);

    async function getTaskTypes(){

        await fetch("/taskTypes")
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
                    setTaskTypes(json);
                }

            })
            .catch((error)=>{
                console.log('Data fetching error.',error)

            });
    };

    async function getFilteredTaskTypes(query=null){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        };

        await fetch("/taskTypes", requestOptions)
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

                if (Array.isArray(json) && json.length > 0) {

                    if(json[0].error!=null){
                        //obsługa błędów przesyłanych z backendu
                        setError(json[0].error);
                    }else{
                        setTaskTypes(json);
                    }
                }else{
                    setTaskTypes([]);
                }

            })
            .catch((error)=>{
                console.log('Data fetching error.',error)
            });
    };

    async function addTaskType(query){

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newType: query })
        };

        await fetch("/taskTypes", requestOptions)
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

                if (Array.isArray(json) && json.length > 0) {

                    if(json[0].error!=null){
                        //obsługa błędów przesyłanych z backendu
                        setError(json[0].error);
                    }else{
                        setTaskTypes(json);
                    }
                }else{
                    setTaskTypes([]);
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

        getTaskTypes();
    }, []);

    return (

        <div className="App">
            {//Blok do przenoszenia na strone z błędami
            }
            {error? navigate('/error', {state:{error: error}}, {replace:true}): null}
            <Background />
            <Header back={`/admin`}/>
            <TaskTypeAddSidebar getFilteredTypes={getFilteredTaskTypes} types={taskTypes} addType={addTaskType}/>
            { taskTypes ? <ModularTaskTypeContetnList taskTypes={taskTypes}/> : null }
        </div>
    )
}

export default TaskTypeAdd;