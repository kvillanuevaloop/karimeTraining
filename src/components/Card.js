import React from "react";
import { useDispatch } from "react-redux";
import { changeCardTitle } from "../reducers/boardSlice";
import { useDrag } from "react-dnd";
import "./Card.scss";
import Types from "../utils";

export default function Card(props) {
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
        onChange={(event) =>
          dispatch(
            changeCardTitle({
              columnId: props.column.id,
              cardId: props.element.id,
              newTitle: event.target.value,
            })
          )
        }
      />
    </div>
  );
}
