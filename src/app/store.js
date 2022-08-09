import { configureStore } from '@reduxjs/toolkit'
import boardSlice from '../reducers/boardSlice'

export default configureStore({
  reducer: {
    boards: boardSlice,
  },
})