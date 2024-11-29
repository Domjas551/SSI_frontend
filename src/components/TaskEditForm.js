import React, { useEffect, useState } from "react";
import "../stylesheets/EditForm.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles

function TaskEditForm(props) {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [task, setTask] = useState(props.task);
    const [taskTypes, setTaskTypes] = useState([]);
    const [date, setDate] = useState(parseDateString(props.task.date)); // Default from task.date
    const [deadline, setDeadline] = useState(parseDateString(props.task.deadline)); // Default from task.deadline

    useEffect(() => {
        fetchTaskTypes();
    }, []);

    useEffect(() => {
        if (error) {
            navigate("/error", { state: { error: error }, replace: true });
        }
    }, [error, navigate]);

    function parseDateString(dateString) {
        const [time, day] = dateString.split(" ");
        const [hours, minutes, seconds] = time.split(":").map(Number);
        const [dayPart, month, year] = day.split("-").map(Number);
        return new Date(year, month - 1, dayPart, hours, minutes, seconds);
    }

    function formatDate(dateObj) {
        const pad = (num) => String(num).padStart(2, "0");
        const hours = pad(dateObj.getHours());
        const minutes = pad(dateObj.getMinutes());
        const seconds = pad(dateObj.getSeconds());
        const day = pad(dateObj.getDate());
        const month = pad(dateObj.getMonth() + 1);
        const year = dateObj.getFullYear();
        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    }

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

        // Extracting form values
        const typeId = event.target.typeId.value;
        const state = event.target.state.value;
        const description = event.target.description.value.trim(); // Trim to remove excess whitespace

        // Check if any required fields are empty
        if (!date) {
            alert("Proszę wprowadzić poprawną datę.");
            return;
        }

        if (!deadline) {
            alert("Proszę wprowadzić poprawną datę.");
            return;
        }

        // Format dates for submission
        const formattedDate = formatDate(date);
        const formattedDeadline = formatDate(deadline);

        updateTask(typeId, state, description, formattedDate, formattedDeadline);
    };

    async function updateTask(type_id, state, description, date, deadline) {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: window.location.pathname.substring(23),
                type_id: type_id,
                state: state,
                description: description,
                date: date,
                deadline: deadline,
            }),
        };

        await fetch("/task", requestOptions)
            .then((res) => {
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
                if (json[0]?.error) {
                    setError(json[0].error);
                } else {
                    setTask(json);
                    alert("Edycja danych przebiegła pomyślnie");
                }
            })
            .catch((error) => {
                console.log("Data fetching error.", error);
            });
    }

    return (
        <main className="form_main-content">
            <div className="form_content-container">
                <h1 className="form_heading">Edycja zadania</h1>
                <form onSubmit={handleSubmit}>
                    <p>Kategoria</p>
                    <select name="typeId" value={task.task_type_id || ""}
                            onChange={(e) => setTask({...task, task_type_id: e.target.value})}>
                        {taskTypes.length > 0 ? (
                            taskTypes.map((taskType) => (
                                <option key={taskType.task_type_id} value={taskType.task_type_id}>
                                    {taskType.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Loading...</option>
                        )}
                    </select>
                    <p>Status</p>
                    <select name="state" defaultValue={task.status}>
                        <option value="zaplanowane">zaplanowane</option>
                        <option value="w toku">w toku</option>
                        <option value="zrealizowane">zrealizowane</option>
                        <option value="przedawnione">przedawnione</option>
                    </select>
                    <p>Data utworzenia</p>
                    <DatePicker
                        selected={date}
                        onChange={(newDate) => setDate(newDate)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="yyyy-MM-dd HH:mm"
                    />
                    <p>Deadline</p>
                    <DatePicker
                        selected={deadline}
                        onChange={(newDate) => setDeadline(newDate)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="yyyy-MM-dd HH:mm"
                        minDate={date} // Ensure deadline is not before the date
                    />
                    <p>Opis zadania</p>
                    <textarea
                        name="description"
                        placeholder="Opis zadania"
                        className="form_description"
                        defaultValue={task.description}
                    />
                    <div className="form_button_container">
                        <button type="submit" className="form_button">
                            Zatwierdź
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default TaskEditForm;
