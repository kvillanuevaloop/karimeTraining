import { createSlice } from "@reduxjs/toolkit";

function indexBoard (state) { return state.list.map((element) => element.id).indexOf(state.currentBoardId)};

export const boardSlice = createSlice({
  name: "boards",
  initialState: {
    list: [],
    currentBoardId: 0,
    idBoard: -1,
    idColumn: -1,
    idCard: -1,
  },
  reducers: {
    addBoard: (state, action) => {
      state.idBoard += 1;
      state.list.push({
        id: state.idBoard,
        title: action.payload,
        columns: [],
      });
    },
    addColumn: (state, action) => {
      state.idColumn += 1;
      state.list[indexBoard(state)].columns.push({
        id: state.idColumn,
        title: action.payload,
        cards: [],
      });
    },
    changeBoard: (state, action) => {
      state.currentBoardId = action.payload;
    },
    deleteBoard: (state, action) => {
      const element = state.list.find(
        (element) => element.id === action.payload
      );
      state.list = state.list.filter((item) => item !== element);
      state.currentBoardId = 0;
    },
    deleteColumn: (state, action) => {
      const element = state.list[indexBoard(state)].columns.find(
        (element) => element.id === action.payload
      );
      state.list[indexBoard(state)].columns = state.list[
        state.currentBoardId
      ].columns.filter((item) => item !== element);
    },
    addCard: (state, action) => {
      state.idCard += 1;
      const columns = state.list[indexBoard(state)].columns;
      const index = columns
        .map((element) => element.id)
        .indexOf(action.payload);
      columns[index].cards.push({ id: state.idCard, title: "Nueva card" });
    },
    changeCardTitle: (state, action) => {
      const column =
        state.list[indexBoard(state)].columns[action.payload.columnId];
      const cardIndex = column.cards
        .map((element) => element.id)
        .indexOf(action.payload.cardId);
      column.cards[cardIndex].title = action.payload.newTitle;
    },
    deleteCard: (state, action) => {
      const element = state.list[indexBoard(state)].columns.find((element) => element.id === action.payload.idColumn).cards.find((element) => element.id === action.payload.idCard);
      state.list[indexBoard(state)].columns.find((element) => element.id === action.payload.idColumn).cards =
        state.list[indexBoard(state)].columns.find((element) => element.id === action.payload.idColumn).cards.filter((item) => item !== element);
    },
    changeColumnTitle: (state, action) => {
      const columns = state.list[indexBoard(state)].columns;
      const cardIndex = columns
        .map((element) => element.id)
        .indexOf(action.payload.id);
      columns[cardIndex].title = action.payload.newTitle;
    },
    moveCard: (state, action) => {
      const columns = state.list[indexBoard(state)].columns;
      const cardToMove = columns.find((element) => element.id === action.payload.idColumn).cards.find((element) => element.id === action.payload.idCard);
      state.list[indexBoard(state)].columns.find((element) => element.id === action.payload.idColumn).cards = columns.find((element) => element.id === action.payload.idColumn).cards.filter((element) => element.id !== cardToMove.id);
      const arrayPosition = Math.floor((action.payload.y - 150) / (75)) + 1;
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
} = boardSlice.actions;

export default boardSlice.reducer;
