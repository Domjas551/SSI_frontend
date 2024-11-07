import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function ModularContetnList(props){

    return (
        <div className="content-list">
            {props.users.map(item => (
                <div key={item.user_id} className="content-list-item">
                    <Link to={`/admin/userEdit/user/${item.user_id}`} className="item-link">{item.user_id}</Link>
                    <div className="item-fields">
                        <div key="name" className="field">
                            <strong>Name:</strong> {item.name}
                        </div>
                        <div key="surname" className="field">
                            <strong>Surname:</strong> {item.surname}
                        </div>
                        <div key="email" className="field">
                            <strong>Email:</strong> {item.email}
                        </div>
                        <div key="position" className="field">
                            <strong>Position:</strong> {item.position}
                        </div>
                        <div key="is_active" className="field">
                            <strong>Account active:</strong> {item.is_active == 1 ? "YES" : "NO"}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


}

export default ModularContetnList;