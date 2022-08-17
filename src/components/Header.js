import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBoard } from "../reducers/boardSlice";
import BoardTitle from "./BoardTitle";
//import Modal from 'react-modal';
import "./Header.scss";

export default function Header() {
  const boards = useSelector((state) => state.boards.list);
  const dispatch = useDispatch();
  const [title,setTitle] = useState('');

  return (
    <div className="component-header">
      <p>Trello:</p>
      {boards.map((board) => (
        <BoardTitle key={board.id} id={board.id} title={board.title}/>
      ))}
      <input type="text" placeholder="Title" onChange={event => setTitle(event.target.value)}/>
      <button
        className="component-button"
        onClick={() => dispatch(addBoard(title))}
      >
        Create board
      </button>
    </div>
  );
}
