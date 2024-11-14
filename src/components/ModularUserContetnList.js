import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function ModularUserContetnList(props){

    return (
        <div className="content-list">
            {props.users.map(item => (
                <div key={item.user_id} className="content-list-item">
                    <Link to={`/admin/userEdit/user/${item.user_id}`} className="item-link">{item.user_id}</Link>
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
                        <div key="is_active" className="field">
                            <strong>Konto aktywne:</strong> {item.is_active == 1 ? "TAK" : "NIE"}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


}

export default ModularUserContetnList;