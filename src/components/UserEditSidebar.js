import React from "react";
import '../stylesheets/Sidebar.css';


function UserEditSidebar(props){

    const validName=new RegExp('^[a-zA-Z]*$');

    const handleSubmit = (event) => {
        event.preventDefault();

        let isChanged=0;

        let query = "Select user_id, name, surname, email, position, is_active from user where";

        let name=event.target.name.value;
        let surname=event.target.surname.value;
        let email=event.target.email.value;
        let position=event.target.position.value;
        let is_active=event.target.is_active.value;

        if(name!="" && validName.test(name)){
            query+=" name like ('%"+name+"%')";
            isChanged=1;
            console.log(query)
        }

        if(surname!="" && validName.test(surname)){

            if(isChanged==0){
                query+=" surname like ('%"+surname+"%')";
                isChanged=1;
            }else{
                query+=" and surname like ('%"+surname+"%')";
            }

        }

        if(email!=""){

            if(isChanged==0){
                query+=" email like ('%"+email+"%')";
                isChanged=1;
            }else{
                query+=" and email like ('%"+email+"%')";
            }

        }

        if(position!="any"){

            if(isChanged==0){
                query+=" position='"+position+"'";
                isChanged=1;
            }else{
                query+=" and position='"+position+"'";
            }

        }

        if(is_active!=2){

            if(isChanged==0){
                query+=" is_active="+is_active+"";
                isChanged=1;
            }else{
                query+=" and is_active="+is_active+"";
            }
        }

        if(isChanged==1){
            props.getFilteredUsers(query);
        }else{
            props.getFilteredUsers();
        }

    };

    return (
        <div className="sidebar">
            <h3>Input Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder="Enter text..."/>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input type="text" id="surname" placeholder="Enter text..."/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter text..."/>
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position:</label>
                    <select name="position" defaultValue="any">
                        <option value="any">Any</option>
                        <option value="pracownik">Pracownik</option>
                        <option value="kierownik">Kierownik</option>
                        <option value="administrator">Administrator</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="dropdown2">Active/Unactive:</label>
                    <select name="is_active" defaultValue={2}>
                        <option value={2}>Both</option>
                        <option value={1}>Active</option>
                        <option value={0}>Unactive</option>
                    </select>
                </div>
                <div className="form_button_container">
                    <button type="submit" className="form_button">Search</button>
                </div>
            </form>
        </div>
    );
}

export default UserEditSidebar;