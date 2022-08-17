import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addColumn, deleteBoard, deleteColumn, deleteCard } from "../reducers/boardSlice";
import Column from "../components/Column";
import { useDrop } from "react-dnd";
import Modal from 'react-modal';
import "./Board.scss";
import Types from "../utils/";

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
  const columns = useSelector((state) => state.boards.list.find((element) => element.id === state.boards.currentBoardId).columns);
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

  function performAction() {
    switch (modalItem.type) {
      case Types.board:
          deleteBoardFunc(modalItem.id);
          break;
      case Types.columns :
          deleteColumnFunc(modalItem.id);
          break;
      default:
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
            onClick={() => {
              dispatch(addColumn(title));
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