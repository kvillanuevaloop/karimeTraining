import React from "react";
import { useDispatch } from "react-redux";
import { changeCardTitle  } from "../reducers/boardSlice";
import { useDrag } from "react-dnd";
import "./Card.css"

export default function Card (props) {
    const dispatch = useDispatch();

    const [ {isDragging}, drag ] = useDrag(()=>({
        type: "card",
        item: {idColumn: props.column.id, idCard: props.element.id, type: 'CARD'},
        collect: (monitor)=>({
            isDragging: !!monitor.isDragging(),
        })
    }))

    return(
        <div className="card-box" ref={drag}>
            <input className="card-input"
                value={props.element.title} 
                onChange={(event) => dispatch(changeCardTitle({columnId: props.column.id, cardId: props.element.id, newTitle: event.target.value}))}
            />
        </div>
    );
}
