import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addColumn } from "../reducers/boardSlice";
import Column from "../components/Column";
import "./Board.css"

export default function Board() {
  const columns = useSelector((state) => state.boards.list[state.boards.currentBoard].columns);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  return (
    <div className="component-board">
      {columns.map((column) => (
        <div className="component-column">
            <Column key={column.id} title={column.title}/>
        </div>
      ))}
      <div className="component-column button-add">
        <input className="field-input" type="text" placeholder="Enter column title" onChange={event => setTitle(event.target.value)} value={title}/>
        <button
            className="create-button"
            onClick={() => {
                dispatch(addColumn(title));
                setTitle('');
            }}
            disabled={title===''}
        >
            Create Column
        </button>
      </div>
    </div>
  );
}