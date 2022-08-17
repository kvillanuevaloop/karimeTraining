import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addColumn, deleteBoard, deleteColumn, deleteCard } from "../reducers/boardSlice";
import Column from "../components/Column";
import { useDrop } from "react-dnd";
import "./Board.css";
import Types from "../utils/";

export default function Board() {
  const columns = useSelector((state) => state.boards.list.find((element) => element.id === state.boards.currentBoardId).columns);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const [, drop] = useDrop( () => ({
    accept: [Types.board, Types.columns, Types.cards],
    drop: (item) => {
        switch (item.type) {
            case Types.board:
                return deleteBoardFunc(item.id);
            case Types.columns :
                return deleteColumnFunc(item.id);
            default:
                return deleteCardFunc({idCard: item.idCard, idColumn: item.idColumn});
        }
    },
    collect: (monitor)=>({
      isOver: !!monitor.isOver(),
  })
  }))

  const deleteBoardFunc = (id) => {dispatch(deleteBoard(id))};
  const deleteColumnFunc = (id) => {dispatch(deleteColumn(id))};
  const deleteCardFunc = ({idCard,idColumn}) => {dispatch(deleteCard({idCard: idCard,idColumn: idColumn}))};


  return (
    <>
    <div className="component-board">
      {columns.map((column) => (
        <div key={column.id} >
          <Column column={column} />
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
    <button className="button-delete" ref={drop}>Delete</button>
    </>
  );
}