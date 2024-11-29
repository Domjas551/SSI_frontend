import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function ModularTaskContentList(props){

    return (
        <div className="content-list">
            {props.tasks.map(item => (
                <div key={item.task_id} className="content-list-item">
                    <Link to={`/manager/taskEdit/task/${item.task_id}`} className="item-link">{item.task_id}</Link>
                    <div className="item-fields">
                        <div key="name" className="field">
                            <strong>Kategoria:</strong> {item.name}
                        </div>
                        <div key="status" className="field">
                            <strong>Status:</strong> {item.status}
                        </div>
                        <div key="date" className="field">
                            <strong>Data utworzenia:</strong> {item.date}
                        </div>
                        <div key="deadline" className="field">
                            <strong>Deadline:</strong> {item.deadline}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


}

export default ModularTaskContentList;