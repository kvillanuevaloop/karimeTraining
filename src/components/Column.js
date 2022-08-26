import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, changeColumnTitle, moveCard } from "../reducers/boardSlice";
import { useDrag, useDrop } from "react-dnd";
import api from '../api';
import Card from "./Card";
import "./Column.scss"
import Types from "../utils"

export default function Column (props) {
  const currentBoardId = useSelector((state) => state.boards.currentBoardId);
  const dispatch = useDispatch();


  const [, drag] = useDrag(() => ({
    type: Types.columns,
    item: { id: props.column.id, type: Types.columns },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: Types.cards,
    drop: (item, monitor) => {
      item.type === Types.cards &&
        moveCardFunc({ idCard: item.idCard, idColumn: item.idColumn, y:monitor.getClientOffset().y })
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveCardFunc = async ({ idCard, idColumn, y }) => {
    const newCard = await api.CARDS.get(
      currentBoardId,
      idColumn,
      idCard
    );
    await api.CARDS.post(currentBoardId, props.column.id, newCard.title);
    await api.CARDS.delete(currentBoardId, idColumn, idCard);
    dispatch(
      moveCard({
        idCard: idCard,
        idColumn: idColumn,
        newIdColumn: props.column.id,
        y,
      })
    );
  };

  return (
    <div className="component-column" ref={drag}>
      <div className="component-drop" ref={drop}>
        <div className="text-row">
          <input
            className="column-text"
            value={props.column.title}
            onChange={ (event) => {
              api.COLUMNS.put(
                currentBoardId,
                props.column.id,
                event.target.value
              );
              dispatch(
                changeColumnTitle({
                  id: props.column.id,
                  newTitle: event.target.value,
                })
              );
            }}
            
          />
          <button
            className="plus-button"
            onClick={async () => {
              const newCard = await api.CARDS.post(
                currentBoardId,
                props.column.id
              );
              dispatch(addCard(newCard));
            }}
          >
            +
          </button>
        </div>
        {props.column.cards &&
          props.column.cards.map((element) => (
            <div key={element.id}>
              <Card element={element} column={props.column} />
            </div>
          ))}
      </div>
    </div>
  );
}