import React, {Component} from "react";
import Background from "./Background";
import Header from "./Header";
import ModularContentButton from "./ModularContentButton";

class AdminMain extends Component{

    constructor() {
        super();
        this.state={
            options: [
                {
                    id: 1,
                    name: "Dodaj pracownika",
                    link: "/admin/userAdd"
                },
                {
                    id: 2,
                    name: "Dodaj typ zadań",
                    link: "/admin/taskTypeAdd"
                },
                {
                    id: 3,
                    name: "Edytuj konta pracowników",
                    link: "/admin/userEdit"
                }
            ]
        };
    }

    render() {
        return(
            <div className="App">
                <Background />
                <Header />
                <ModularContentButton options={this.state.options} />
            </div>
        )
    }
}

export default AdminMain;