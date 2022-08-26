import { createSlice } from "@reduxjs/toolkit";

function indexBoard (state) { return state.list.map((element) => element.id).indexOf(state.currentBoardId)};

export const boardSlice = createSlice({
  name: "boards",
  initialState: {
    list: [],
    currentBoardId: 0,
  },
  reducers: {
    addBoard: (state, action) => {
      state.list.push({
        id: action.payload.id,
        title: action.payload.title,
        columns: [],
      });
    },
    addInitialBoards: (state, action) => {
      action.payload.forEach(element => {
        state.list.push({
          id: element.id,
          title: element.title,
          columns: element.columns,
        });
      });
      state.currentBoardId = state.list[0].id;
    },
    addColumn: (state, action) => {
      state.list[indexBoard(state)].columns.push({
        id: action.payload.id,
        title: action.payload.title,
        cards: [],
      });
    },
    addInitialColumns: (state, action) => {
      state.list[indexBoard(state)].columns = [];
      action.payload.forEach(element => {
        state.list[indexBoard(state)].columns.push({
          id: element.id,
          title: element.title,
          cards: element.cards,
        });
      });
    },
    changeBoard: (state, action) => {
      state.currentBoardId = action.payload;
    },
    deleteBoard: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      if (state.list[0]) {
        state.currentBoardId = state.list[0].id;
      } else state.currentBoardId = -1;
    },
    deleteColumn: (state, action) => {
      state.list[indexBoard(state)].columns = state.list[
        indexBoard(state)
      ].columns.filter((item) => item.id !== action.payload);
    },
    addCard: (state, action) => {
      const index = state.list[indexBoard(state)].columns
        .map((element) => element.id)
        .indexOf(action.payload.columnId);
        state.list[indexBoard(state)].columns[index].cards.push(action.payload);
    },
    changeCardTitle: (state, action) => {
      const columnIndex = state.list[indexBoard(state)].columns.map((element) => element.id)
      .indexOf(action.payload.columnId);
      const cardIndex = state.list[indexBoard(state)].columns[columnIndex].cards
        .map((element) => element.id)
        .indexOf(action.payload.cardId);
        state.list[indexBoard(state)].columns[columnIndex].cards[cardIndex].title = action.payload.newTitle;
    },
    deleteCard: (state, action) => {
      state.list[indexBoard(state)].columns.find((element) => element.id === action.payload.idColumn).cards =
        state.list[indexBoard(state)].columns.find((element) => element.id === action.payload.idColumn).cards.filter((item) => item.id !== action.payload.idCard);
    },
    changeColumnTitle: (state, action) => {
      const columns = state.list[indexBoard(state)].columns;
      const columnIndex = columns
        .map((element) => element.id)
        .indexOf(action.payload.id);
      columns[columnIndex].title = action.payload.newTitle;
    },
    moveCard: (state, action) => {
      const columns = state.list[indexBoard(state)].columns;
      const cardToMove = columns.find((element) => element.id === action.payload.idColumn).cards.find((element) => element.id === action.payload.idCard);
      state.list[indexBoard(state)].columns.find((element) => element.id === action.payload.idColumn).cards = columns.find((element) => element.id === action.payload.idColumn).cards.filter((element) => element.id !== cardToMove.id);
      const arrayPosition = Math.floor((action.payload.y - 170) / (80)) + 1;
      const index =
        action.payload.y < 150
          ? 0
          : arrayPosition < columns.find((element) => element.id === action.payload.newIdColumn).cards.length
          ? arrayPosition
          : columns.find((element) => element.id === action.payload.newIdColumn).cards.length;
      columns.find((element) => element.id === action.payload.newIdColumn).cards.splice(index,0,cardToMove);
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  addBoard,
  addColumn,
  changeBoard,
  deleteBoard,
  deleteColumn,
  addCard,
  changeCardTitle,
  deleteCard,
  changeColumnTitle,
  moveCard,
  addInitialBoards,
  addInitialColumns,
} = boardSlice.actions;

export default boardSlice.reducer;
