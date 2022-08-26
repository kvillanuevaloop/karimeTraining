import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCardTitle } from "../reducers/boardSlice";
import { useDrag } from "react-dnd";
import api from '../api';
import "./Card.scss";
import Types from "../utils";

export default function Card(props) {
  const currentBoardId = useSelector((state) => state.boards.currentBoardId);
  const dispatch = useDispatch();

  const [, drag] = useDrag(() => ({
    type: Types.cards,
    item: { idColumn: props.column.id, idCard: props.element.id, type: Types.cards},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  return (
    <div className="card-box" ref={drag}>
      <input
        className="card-input"
        value={props.element.title}
        onChange={(event) => {
          api.CARDS.put(
            currentBoardId,
            props.column.id,
            props.element.id,
            event.target.value
          );
          dispatch(
            changeCardTitle({
              columnId: props.column.id,
              cardId: props.element.id,
              newTitle: event.target.value,
            })
          )
        }}
      />
    </div>
  );
}
