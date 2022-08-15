import React from "react";
import { useDrag } from "react-dnd";
import "./Column.css"

export default function Column (props) {
    
    const [{isDragging}, drag ] = useDrag(()=>({
        type: "column",
        item: {id: props.id, type: 'COLUMN'},
        collect: (monitor)=>({
            isDragging: !!monitor.isDragging(),
        })
    }))

    return(
        <div className="component-column" key={props.id} ref={drag} >
            <p className="column-text">{props.title}</p>
        </div>
    );
    
}