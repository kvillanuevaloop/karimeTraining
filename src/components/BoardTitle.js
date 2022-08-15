import React from "react";
import { useDispatch } from "react-redux";
import { changeBoard } from "../reducers/boardSlice";
import { useDrag } from "react-dnd";
import "./BoardTitle.css"

const BoardTitle = (props) => {
        const dispatch = useDispatch();

        const [{isDragging}, drag ] = useDrag(()=>({
            type: "board",
            item: {id: props.id, type: 'BOARD'},
            collect: (monitor)=>({
                isDragging: !!monitor.isDragging(),
            })
        }))

        return(
            <button className="component-title"
                ref={drag} 
                onClick={()=>{dispatch(changeBoard(props.id))}} 
                >
                <p className="title-text">{props.title}</p>
            </button>
        );
}

export default BoardTitle;