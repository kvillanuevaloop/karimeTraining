import React from "react";
import "./Column.css"

export default class Column extends React.Component {
    render() {
        return(
            <div className="column-title" key={this.props.id}>
                <p className="column-text">{this.props.title}</p>
            </div>
        );
    }
}