import React, {useEffect, useState} from "react";
import '../stylesheets/Sidebar.css';


function TaskEditSidebar(props){
    const [taskTypes, setTaskTypes] = useState([]);
    const [error, setError] = useState(null);

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

        let isWhere=0;
        let isChanged=0;

        let query = "Select task.task_id, task.task_type_id, task_type.name, task.status, task.date, task.deadline from task join task_type on task.task_type_id=task_type.task_type_id";

        let order=event.target.order.value;
        let type=event.target.type.value;
        let state=event.target.state.value;


        if(state!="any"){
            if(isChanged==0){
                isChanged=1;
                if(isWhere==0) {
                    query += " where task.status='" + state + "'";
                    isWhere=1;
                }
                else
                {
                    query += " and task.status='" + state + "'";
                }
            }else{
                if(isWhere==0) {
                    query += " where task.status='" + state + "'";
                    isWhere=1;
                }
                else
                {
                    query += " and task.status='" + state + "'";
                }
            }
        }

        if(type!="any"){
            if(isChanged==0){
                isChanged=1;
                if(isWhere==0) {
                    query += " where task_type.name='" + type + "'";
                    isWhere=1;
                }
                else
                {
                    query += " and task_type.name='" + type + "'";
                }
            }else{
                if(isWhere==0) {
                    query += " where task_type.name='" + type + "'";
                    isWhere=1;
                }
                else
                {
                    query += " and task_type.name='" + type + "'";
                }
            }
        }

        if(order!="noOrder"){
            if(isChanged==0){
                if(order=="newestDate")
                {
                    query += " ORDER BY STR_TO_DATE(date, '%H:%i:%s %d-%m-%Y') desc";
                }
                else if (order=="oldestDate")
                {
                    query += " ORDER BY STR_TO_DATE(date, '%H:%i:%s %d-%m-%Y')";
                }
                else if (order=="newestDeadline")
                {
                    query += " ORDER BY STR_TO_DATE(deadline, '%H:%i:%s %d-%m-%Y') desc";
                }
                else if (order=="oldestDeadline")
                {
                    query += " ORDER BY STR_TO_DATE(deadline, '%H:%i:%s %d-%m-%Y')";
                }
                isChanged=1;
            }else{
                if(order=="newestDate")
                {
                    query += " ORDER BY STR_TO_DATE(date, '%H:%i:%s %d-%m-%Y') desc";
                }
                else if (order=="oldestDate")
                {
                    query += " ORDER BY STR_TO_DATE(date, '%H:%i:%s %d-%m-%Y')";
                }
                else if (order=="newestDeadline")
                {
                    query += " ORDER BY STR_TO_DATE(deadline, '%H:%i:%s %d-%m-%Y') desc";
                }
                else if (order=="oldestDeadline")
                {
                    query += " ORDER BY STR_TO_DATE(deadline, '%H:%i:%s %d-%m-%Y')";
                }
            }
        }

        if(isChanged==1){
            props.getFilteredTasks(query);
        }else{
            props.getFilteredTasks();
        }

    };

    return (
        <div className="sidebar">
            <h3>Filtrowanie użytkowników</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="order">Sortuj:</label>
                    <select name="order" defaultValue="noOrder">
                        <option value="noOrder">nie sortuj</option>
                        <option value="newestDate">od najnowszych (rozpoczęcie)</option>
                        <option value="oldestDate">od najstarszych (rozpoczęcie)</option>
                        <option value="newestDeadline">od najnowszych (deadline)</option>
                        <option value="oldestDeadline">od najstarszych (deadline)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="type">Kategoria:</label>
                    <select name="type" defaultValue="any">
                        <option value="any">dowolna</option>
                        {taskTypes.map((taskType) => (
                            <option key={taskType.name} value={taskType.name}>
                                {taskType.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="state">Status:</label>
                    <select name="state" defaultValue="any">
                        <option value="any">dowolny</option>
                        <option value="zaplanowane">zaplanowane</option>
                        <option value="w toku">w toku</option>
                        <option value="zrealizowane">zrealizowane</option>
                        <option value="przedawnione">przedawnione</option>
                    </select>
                </div>
                <div className="form_button_container">
                    <button type="submit" className="form_button">Filtruj</button>
                </div>
            </form>
        </div>
    );
}

export default TaskEditSidebar;