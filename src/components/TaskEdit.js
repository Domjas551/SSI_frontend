import React, { useEffect, useState } from "react";
import Background from "./Background";
import Header from "./Header";
import TaskEditForm from "./TaskEditForm";
import Heading from "./Heading";
import ModularUnassignedUserContentList from "./ModularUnassignedUserContentList";
import ModularAssignedUserContentList from "./ModularAssignedUserContentList";
import { useNavigate } from "react-router-dom";

function TaskEdit() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [task, setTask] = useState(null);
    const [assignedUsers, setAssignedUsers] = useState(null);
    const [unassignedUsers, setUnassignedUsers] = useState(null);

    const taskId = window.location.pathname.substring(23,); // Extract task ID from URL

    // Fetch task details
    async function getTask() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value: taskId }),
        };

        await fetch("/task", requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    let message = res.statusText === "Internal Server Error"
                        ? "Nie można połączyć się z serwerem"
                        : "Błąd pobierania danych";
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
            .catch((error) => console.log("Data fetching error.", error));
    }

    // Fetch assigned users
    async function getAssignedUsers() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value: taskId }),
        };

        await fetch("/usersAppointedToTask", requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    let message = res.statusText === "Internal Server Error"
                        ? "Nie można połączyć się z serwerem"
                        : "Błąd pobierania danych";
                    setError(message);
                }
            })
            .then((json) => {
                if (json[0]?.error) {
                    setError(json[0].error);
                } else {
                    setAssignedUsers(json);
                }
            })
            .catch((error) => console.log("Data fetching error.", error));
    }

    // Fetch unassigned users
    async function getUnassignedUsers() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value: taskId }),
        };

        await fetch("/usersNotAppointedToTask", requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    let message = res.statusText === "Internal Server Error"
                        ? "Nie można połączyć się z serwerem"
                        : "Błąd pobierania danych";
                    setError(message);
                }
            })
            .then((json) => {
                if (json[0]?.error) {
                    setError(json[0].error);
                } else {
                    setUnassignedUsers(json);
                }
            })
            .catch((error) => console.log("Data fetching error.", error));
    }

    // Callback to handle user assignment
    const handleUserAssigned = (userId) => {
        // Move the user from unassigned to assigned list
        const assignedUser = unassignedUsers.find((user) => user.user_id === userId);
        if (assignedUser) {
            setUnassignedUsers((prev) => prev.filter((user) => user.user_id !== userId));
            setAssignedUsers((prev) => [...prev, assignedUser]);
        }
    };

    // Callback to handle user unassignment
    const handleUserUnassigned = (userId) => {
        // Move the user from assigned to unassigned list
        const unassignedUser = assignedUsers.find((user) => user.user_id === userId);
        if (unassignedUser) {
            setAssignedUsers((prev) => prev.filter((user) => user.user_id !== userId));
            setUnassignedUsers((prev) => [...prev, unassignedUser]);
        }
    };

    // Initial fetch on component mount
    useEffect(() => {
        if (sessionStorage.getItem("uprawnienia") != 2) {
            navigate("/", { replace: false });
        }
        getTask();
        getAssignedUsers();
        getUnassignedUsers();
    }, []);

    // Redirect if there's an error
    useEffect(() => {
        if (error) {
            navigate("/error", { state: { error: error } }, { replace: true });
        }
    }, [error]);

    return (
        <div className="App">
            <Background />
            <Header back={`/manager/taskEditSelect`} />
            {task ? <TaskEditForm task={task} /> : null}
            <Heading heading={`Pracownicy przypisani do wybranego zadania`} />
            {assignedUsers ? (
                <ModularAssignedUserContentList
                    users={assignedUsers}
                    onUserUnassigned={handleUserUnassigned}
                />
            ) : null}
            <Heading heading={`Pozostali pracownicy`} />
            {unassignedUsers ? (
                <ModularUnassignedUserContentList
                    users={unassignedUsers}
                    onUserAssigned={handleUserAssigned}
                />
            ) : null}
        </div>
    );
}

export default TaskEdit;
