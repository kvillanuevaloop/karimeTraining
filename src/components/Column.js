import React from "react";
import { useDispatch } from "react-redux";
import { addCard, changeColumnTitle, moveCard } from "../reducers/boardSlice";
import { useDrag, useDrop } from "react-dnd";
import Card from "./Card";
import "./Column.css"
import Types from "../utils"

export default function Column (props) {
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

  const moveCardFunc = ({ idCard, idColumn, y }) => {
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
            onChange={(event) =>
              dispatch(
                changeColumnTitle({
                  id: props.column.id,
                  newTitle: event.target.value,
                })
              )
            }
          />
          <button
            className="plus-button"
            onClick={() => {
              dispatch(addCard(props.column.id));
            }}
          >
            +
          </button>
        </div>
        {props.column.cards.map((element) => (
          <div key={element.id}>
            <Card element={element} column={props.column} />
          </div>
        ))}
      </div>
    </div>
  );
}