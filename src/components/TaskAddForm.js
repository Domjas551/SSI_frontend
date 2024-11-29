import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles

function TaskAddForm() {
    const navigate = useNavigate();
    const [taskTypes, setTaskTypes] = useState([]);
    const [error, setError] = useState(null);
    const [deadline, setDeadline] = useState(new Date()); // Use state for deadline picker

    useEffect(() => {
        fetchTaskTypes();
    }, []);

    async function fetchTaskTypes() {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        await fetch("/taskTypes", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data[0]?.error) {
                    setError(data[0].error);
                } else {
                    setTaskTypes(data);
                }
            })
            .catch((error) => {
                console.log("Data fetching error.", error);
                setError("Failed to fetch task types");
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const typeId = event.target.typeId.value;
        const description = event.target.description.value;

        if (!deadline) {
            alert("Proszę wprowadzić poprawną datę.");
            return;
        }
        // Format the selected deadline date
        const deadlineDate = new Date(deadline);
        const deadlineFormatted = `${String(deadlineDate.getHours()).padStart(2, "0")}:${String(
            deadlineDate.getMinutes()
        ).padStart(2, "0")}:00 ${String(deadlineDate.getDate()).padStart(2, "0")}-${String(
            deadlineDate.getMonth() + 1
        ).padStart(2, "0")}-${deadlineDate.getFullYear()}`;

        addTask(typeId, description, deadlineFormatted);
    };

    async function addTask(typeId, description, deadline) {
        const now = new Date();

        const currentFormatted = `${String(now.getHours()).padStart(2, "0")}:${String(
            now.getMinutes()
        ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} ${String(
            now.getDate()
        ).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                typeId,
                description,
                status: "zaplanowane",
                date: currentFormatted,
                deadline,
            }),
        };

        await fetch("/manager/taskAdd", requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    setError("Nie można połączyć się z serwerem");
                }
            })
            .then((json) => {
                if (json[0]?.error) {
                    setError(json[0].error);
                } else {
                    alert("Dodano nowe zadanie!");
                    window.location.reload(true);
                }
            })
            .catch((error) => {
                console.log("Data fetching error.", error);
            });
    }

    return (
        <main className="form_main-content">
            {error ? navigate("/error", { state: { error }, replace: true }) : null}
            <div className="form_content-container">
                <h1 className="form_heading">Dodawanie zadania</h1>
                <form onSubmit={handleSubmit}>
                    <p>Typ</p>
                    <select name="typeId">
                        {taskTypes.map((taskType) => (
                            <option key={taskType.task_type_id} value={taskType.task_type_id}>
                                {taskType.name}
                            </option>
                        ))}
                    </select>
                    <p>Deadline</p>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        showTimeSelect
                        timeFormat="HH:mm" // 24-hour fonpmrmat
                        dateFormat="yyyy-MM-dd HH:mm" // 24-hour date and time format
                        minDate={new Date()} // Prevent past dates
                    />
                    <p>Opis zadania</p>
                    <textarea name="description" placeholder="Opis zadania" className="form_description"/>
                    <div className="form_button_container">
                        <button type="submit" className="form_button">Dodaj</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default TaskAddForm;
