import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'boards',
  initialState: {
    list: [],
    currentBoard: 0,
    idBoard: -1,
    idColumn: -1,
  },
  reducers: {
    addBoard: (state, action) => {
      state.idBoard += 1;
      state.list.push({ id: state.idBoard ,title: action.payload, columns: [] });
    },
    addColumn: (state, action) => {
      state.idColumn += 1;
      state.list[state.currentBoard].columns.push({id: state.idColumn, title: action.payload});
    },
    changeBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
    deleteBoard: (state, action) => {
      const element = state.list.find((element)=> element.id === action.payload);
      state.list = state.list.filter((item) => item !== element);
      state.currentBoard = 0;
    },
    deleteColumn: (state, action) => {
      const element = state.list[state.currentBoard].columns.find((element)=> element.id === action.payload);
      state.list[state.currentBoard].columns = state.list[state.currentBoard].columns.filter((item) => item !== element);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addBoard, addColumn, changeBoard , deleteBoard, deleteColumn} = boardSlice.actions

export default boardSlice.reducer