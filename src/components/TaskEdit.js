import React, {useEffect, useState} from "react";
import Background from "./Background";
import Header from "./Header";
import TaskEditForm from "./TaskEditForm";
import Heading from "./Heading";
import {useNavigate} from "react-router-dom";

function TaskEdit() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [task, setTask] = useState(null);

    async function getTask() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: window.location.pathname.substring(23,) })
        };

        await fetch("/task", requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    let message;
                    if (res.statusText === "Internal Server Error") {
                        message = "Nie można połączyć się z serwerem";
                    }
                    setError(message);
                }
            })
            .then((json) => {
                if (json[0] === undefined) {
                    setError("Zadanie o danym id nie istnieje");
                } else if (json[0].error != null) {
                    setError(json[0].error);
                } else {
                    setTask(json[0]);
                }
            })
            .catch((error) => {
                console.log('Data fetching error.', error);
            });
    }

    useEffect(() => {
        if (sessionStorage.getItem("uprawnienia") != 2) {
            navigate('/', { replace: false });
        }
        getTask();
    }, []);

    // Redirect if there's an error
    useEffect(() => {
        if (error) {
            navigate('/error', { state: { error: error } }, { replace: true });
        }
    }, [error]);

    return (
        <div className="App">
            <Background />
            <Header back={`/manager/taskEditSelect`} />
            {task ? <TaskEditForm task={task} /> : null}
            <Heading heading={`Pracownicy przypisani do wybranego zadania`} />
            <Heading heading={`Pozostali pracownicy`} />
        </div>
    );
}

export default TaskEdit;
