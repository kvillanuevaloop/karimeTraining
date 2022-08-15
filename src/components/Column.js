import React from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../reducers/boardSlice";
import { useDrag } from "react-dnd";
import Card from "./Card";
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
                <div key={element.id}>
                    <Card element={element} column={props.column} />
                </div>
            ))}
        </div>
    );
    
}