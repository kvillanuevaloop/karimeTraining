import React from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Board from "./components/Board";
import "./App.css"

function App() {
  const boards = useSelector((state) => state.boards.list);
  
  return (
    <div className="App">
      <Header/>
      {boards.length > 0 && <Board />}
    </div>
  );
}

export default App;