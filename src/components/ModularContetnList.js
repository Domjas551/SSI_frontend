import React, {Component} from "react";

class ModularContetnList extends Component{

    componentDidMount() {
        console.log(this.props.users)
    }

    render() {
        return (
            <div className="content-list">
                {this.props.users.map(user=>{
                    <div>{user.id}</div>
                })}
                {/*items.map(item => (
                    <div key={item.id} className="content-list-item">
                        <a href={item.link} className="item-link">{item.title}</a>
                        <div className="item-fields">
                            {item.fields.map((field, index) => (
                                <div key={index} className="field">
                                    <strong>{field.label}:</strong> {field.content}
                                </div>
                            ))}
                        </div>
                    </div>
                ))*/}
            </div>
        );
    }

}

export default ModularContetnList;