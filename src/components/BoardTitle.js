import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBoard } from "../reducers/boardSlice";
import { useDrag } from "react-dnd";
import "./BoardTitle.scss"
import Types from "../utils"

const BoardTitle = (props) => {
    const currentBoardId = useSelector((state) => state.boards.currentBoardId);
    const styleCurrentBoard = currentBoardId === props.id ? {backgroundColor: 'yellow'} : {}
        const dispatch = useDispatch();

        const [, drag ] = useDrag(()=>({
            type: Types.board,
            item: {id: props.id, type: Types.board},
            collect: (monitor)=>({
                isDragging: !!monitor.isDragging(),
            })
        }))

        return(
            <button className="component-title" style={styleCurrentBoard}
                ref={drag} 
                onClick={()=>{dispatch(changeBoard(props.id))}} 
                >
                <p className="title-text">{props.title}</p>
            </button>
        );
}

export default BoardTitle;