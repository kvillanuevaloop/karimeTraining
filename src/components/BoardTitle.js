import React from "react";
import { useDispatch } from "react-redux";
import { changeBoard } from "../reducers/boardSlice";
import "./BoardTitle.css"

const BoardTitle = (props) => {
        const dispatch = useDispatch();
        return(
            <button className="component-title" 
                key={props.id} 
                onClick={()=>{dispatch(changeBoard(props.id))}} 
                onDrag={()=>{}}>
                <p className="title-text">{props.title}</p>
            </button>
        );
}

export default BoardTitle;