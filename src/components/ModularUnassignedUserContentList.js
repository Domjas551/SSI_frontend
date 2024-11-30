import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function ModularUnassignedUserContentList(props) {
    async function assignUser(taskId, userId) {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId: taskId, userId: userId }),
        };

        await fetch("/manager/assign", requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    let message;
                    if (res.statusText === "Internal Server Error") {
                        message = "Nie można połączyć się z serwerem";
                    }
                    throw new Error(message);
                }
            })
            .then((json) => {
                if (json[0].error) {
                    alert(`Error: ${json[0].error}`);
                } else {
                    props.onUserAssigned(userId); // Trigger parent function to update UI
                }
            })
            .catch((error) => {
                console.error("Error while assigning user:", error);
            });
    }

    const taskId = window.location.pathname.substring(23,); // Extract task ID from URL

    return (
        <div className="content-list-with-button">
            {props.users.map((item) => (
                <div key={item.user_id} className="content-list-item">
                    <div className="item-fields">
                        <div key="name" className="field">
                            <strong>Imie:</strong> {item.name}
                        </div>
                        <div key="surname" className="field">
                            <strong>Nazwisko:</strong> {item.surname}
                        </div>
                        <div key="email" className="field">
                            <strong>Email:</strong> {item.email}
                        </div>
                        <div key="position" className="field">
                            <strong>Stanowisko:</strong> {item.position}
                        </div>
                    </div>
                    <button
                        className="assign-button"
                        onClick={() => assignUser(taskId, item.user_id)}
                    >
                        +
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ModularUnassignedUserContentList;