import React, {Component} from "react";
import ContentList from "./ContentList";
import Background from "./Background";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ModularContetnList from "./ModularContetnList";

class UserEdit extends Component{

    constructor() {
        super();
        this.state={
            users: []
        };
    }


    getUsers = () => {
        fetch("/users")
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                this.setState({users:json})
            })
            .catch((error)=>{
                console.log('Data fetching error.',error)
            });

    }

    componentDidMount() {

         fetch("/users")
            .then(res => res.json())
            .then((json) => {
                this.setState({users:json})
            })
            .catch((error)=>{
                console.log('Data fetching error.',error)
            });

        console.log(this.state.users)

    }

    render() {
        return (
            <div className="App">
                <Background />
                <Header />
                <Sidebar />
                <ModularContetnList users={this.state.users}/>
            </div>
        )
    }
}

export default UserEdit;