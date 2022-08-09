import { createSlice } from '@reduxjs/toolkit'

export const boardSlice = createSlice({
  name: 'boards',
  initialState: {
    list: [],
    currentBoard: 0,
    id: -1,
  },
  reducers: {
    addBoard: (state, action) => {
      state.id += 1;
      state.list.push({ id: state.id ,title: action.payload, columns: [] });
    },
    addColumn: (state, action) => {
      state.list[state.currentBoard].columns = [...state.list[state.currentBoard].columns, {id: state.list[state.currentBoard].columns.length, title: action.payload}]
    },
    changeBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addBoard, addColumn, changeBoard } = boardSlice.actions

export default boardSlice.reducer