import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addColumn, deleteBoard, deleteColumn, deleteCard, addInitialColumns } from "../reducers/boardSlice";
import { useDrop } from "react-dnd";
import api from '../api';
import Column from "../components/Column";
import Modal from 'react-modal';
import Types from "../utils/";
import "./Board.scss";

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Board() {
  const currentBoardId = useSelector((state) => state.boards.currentBoardId);
  const columns = useSelector((state) => state.boards.list[state.boards.list.map((element) => element.id).indexOf(state.boards.currentBoardId)].columns);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [modalItem, setItem] = useState(null);
  
  const [, drop] = useDrop( () => ({
    accept: [Types.board, Types.columns, Types.cards],
    drop: (item) => {
        setItem(item);
    },
    collect: (monitor)=>({
      isOver: !!monitor.isOver(),
  })
  }))

  const performAction = async () => {
    switch (modalItem.type) {
      case Types.board:
          await api.BOARDS.delete(modalItem.id);
          deleteBoardFunc(modalItem.id);
          break;
      case Types.columns :
          await api.COLUMNS.delete(currentBoardId, modalItem.id);
          deleteColumnFunc(modalItem.id);
          break;
      default:
          await api.CARDS.delete(currentBoardId, modalItem.idColumn, modalItem.idCard)
          deleteCardFunc({
            idCard: modalItem.idCard,
            idColumn: modalItem.idColumn,
          });
    }
    setItem(null);
  }

  const deleteBoardFunc = (id) => {dispatch(deleteBoard(id))};
  const deleteColumnFunc = (id) => {dispatch(deleteColumn(id))};
  const deleteCardFunc = ({idCard,idColumn}) => {dispatch(deleteCard({idCard: idCard,idColumn: idColumn}))};

  function closeModal() {
    setItem(null);
  }

  useEffect(()=>{
    const fetchData = async () => {
      const result = await api.COLUMNS.get(currentBoardId);
      dispatch(addInitialColumns(result));
    };
    fetchData();
  },[currentBoardId, dispatch]);

  return (
    <>
      <div className="component-board">
        {columns.map((column) => (
          <div key={column.id}>
            <Column column={column} />
          </div>
        ))}
        <div className="component-column button-add">
          <input
            className="field-input"
            type="text"
            placeholder="Enter column title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <button
            className="create-button"
            onClick={async () => {
              const newColumn = await api.COLUMNS.post(currentBoardId,title);
              dispatch(addColumn(newColumn));
              setTitle("");
            }}
            disabled={title === ""}
          >
            Create Column
          </button>
        </div>

      </div>
      <button className="button-delete" ref={drop}>
        Delete
      </button>
      <Modal
        isOpen={modalItem !== null}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {modalItem !== null && <h2>Are you sure you want to delete the {modalItem.type}?</h2>}
          <button onClick={closeModal}>Close</button>
          <button onClick={performAction}>Delete</button>
      </Modal>
    </>
  );
}