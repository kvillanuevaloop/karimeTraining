import React from "react";
import { useDispatch } from "react-redux";
import { addCard, changeCardTitle  } from "../reducers/boardSlice";
import { useDrag } from "react-dnd";
import "./Column.css"

export default function Column (props) {
    const dispatch = useDispatch();

    const [{isDragging}, drag ] = useDrag(()=>({
        type: "column",
        item: {id: props.column.id, type: 'COLUMN'},
        collect: (monitor)=>({
            isDragging: !!monitor.isDragging(),
        })
    }))

    return(
        <div className="component-column" key={props.column.id} ref={drag} >
            <div className="text-row">
                <p className="column-text">{props.column.title}</p>
                <button className="plus-button" onClick={()=>{dispatch(addCard(props.column.id))}}>+</button>
            </div>
            {props.column.cards.map((element) => (
                <div className="card-box" key={element.id}>
                    <input className="card-input"
                    value={element.title} 
                    onChange={(event) => dispatch(changeCardTitle({columnId: props.column.id, cardId: element.id, newTitle: event.target.value}))}
                    />
                </div>
            ))}
        </div>
    );
    
}