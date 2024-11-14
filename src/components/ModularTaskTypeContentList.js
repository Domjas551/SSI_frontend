import React from "react";

function ModularTaskTypeContetnList(props){

    return (
        <div className="content-list">
            {props.taskTypes.map(item => (
                <div key={item.task_type_id} className="content-list-item">
                    {item.task_type_id}
                    <div className="item-fields">
                        <div key="name" className="field">
                            <strong>Nazwa:</strong> {item.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


}

export default ModularTaskTypeContetnList;