import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBoard, addInitialBoards } from "../reducers/boardSlice";
import BoardTitle from "./BoardTitle";
import api from "../api";
import "./Header.scss";

export default function Header() {
  const boards = useSelector((state) => state.boards.list);
  const dispatch = useDispatch();
  const [title,setTitle] = useState('');

  useEffect(()=>{
    const fetchData = async () => {
      const boards = await api.BOARDS.get();
      dispatch(addInitialBoards(boards));
    };
    fetchData();
  },[dispatch]);

  return (
    <div className="component-header">
      <p>Trello:</p>
      {boards.map((board) => (
        <BoardTitle key={`${board.id}board`} id={board.id} title={board.title}/>
      ))}
      <input type="text" placeholder="Title" onChange={event => setTitle(event.target.value)}/>
      <button
        className="component-button"
        onClick={async () => {
          const newBoard = await api.BOARDS.post(title);
          dispatch(addBoard(newBoard));
        }}
      >
        Create board
      </button>
    </div>
  );
}
