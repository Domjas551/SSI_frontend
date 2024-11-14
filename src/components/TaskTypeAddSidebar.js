import React from "react";

function TaskTypeAddSidebar(props){

    const validName=new RegExp('^[a-zA-Z]*$');

    const handleSubmit1 = (event) => {
        event.preventDefault();

        let isChanged=0;

        let query = "Select task_type_id, name from task_type where";

        let name=event.target.name.value;

        if(name!="" && validName.test(name)){
            query+=" name like ('%"+name+"%')";
            isChanged=1;
        }

        if(isChanged==1){
            props.getFilteredTypes(query);
        }else{
            props.getFilteredTypes();
        }

    };

    const handleSubmit2=(event)=>{
        event.preventDefault();

        let name=event.target.name.value;

        let typeNames=[];

        for(let i=0;i<props.types.length;i++){
            typeNames.push(props.types[i].name);
        }

        if(validName.test(name)){
            if(typeNames.includes(name)){
                alert("Podany typ zadania już istnieje")
            }else{
                let query=`Insert into task_type values(null,"${name}")`
                props.addType(query);
                alert("Poprawnie dodano nowy typ")
                window.location.reload(true)
            }

        }else{
            alert("Podano niepoprawny format nazwy")
        }

    }

    return (
        <div className="sidebar">
            <h3>Filtrowanie typów</h3>
            <form onSubmit={handleSubmit1}>
                <div className="form-group">
                    <label htmlFor="name">Nazwa:</label>
                    <input type="text" id="name" placeholder="Enter text..."/>
                </div>
                <div className="form_button_container">
                    <button type="submit" className="form_button">Szukaj</button>
                </div>
            </form>
            <h3>Dodawanie nowego typu</h3>
            <form onSubmit={handleSubmit2}>
                <div className="form-group">
                    <label htmlFor="name">Nazwa:</label>
                    <input type="text" id="name" placeholder="Enter text..."/>
                </div>
                <div className="form_button_container">
                    <button type="submit" className="form_button">Dodaj</button>
                </div>
            </form>
        </div>
    );

}

export default TaskTypeAddSidebar;