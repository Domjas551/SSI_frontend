import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import ModularTaskContentList from "./ModularTaskContentList";
import TaskEditSidebar from "./TaskEditSidebar";
import {useNavigate} from "react-router-dom";

function TaskEditSelect(){

    const navigate=useNavigate();

    const [tasks, setTasks] = useState(null);
    const [error, setError] = useState(null)

    async function getTasks(){
        await fetch("/tasks")
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
                    setTasks(json);
                }
            })
            .catch((error)=>{
                console.log('Data fetching error.',error)
            });
    };

    async function getFilteredTasks(query = null) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query }),
        };

        try {
            const res = await fetch("/tasks", requestOptions);

            if (!res.ok) {
                let message = res.statusText === "Internal Server Error"
                    ? "Nie można połączyć się z serwerem"
                    : "Wystąpił nieoczekiwany błąd";
                setError(message);
                return;
            }

            const json = await res.json();

            if (Array.isArray(json) && json.length > 0) {
                if (json[0]?.error) {
                    // Handle backend-specific error messages
                    setError(json[0].error);
                } else {
                    setTasks(json); // Set tasks if valid data is received
                }
            } else {
                setTasks([]); // No tasks returned; clear the list
            }
        } catch (error) {
            console.log('Data fetching error.', error);
            setError("Błąd pobierania danych");
        }
    }

    useEffect( () => {

        if(sessionStorage.getItem("uprawnienia")!=2){
            navigate('/', {replace:false})
        }

        getTasks();
    }, []);


    return (

        <div className="App">
            {//Blok do przenoszenia na strone z błędami
            }
            {error? navigate('/error', {state:{error: error}}, {replace:true}): null}
            <Background />
            <Header back={`/manager`}/>
            <TaskEditSidebar  getFilteredTasks={getFilteredTasks}/>
            { tasks ? <ModularTaskContentList tasks={tasks}/> : null }
        </div>
    )

}

export default TaskEditSelect;