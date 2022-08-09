let nextBoardId = 0
export const addBoard = text => ({
  type: 'ADD_BOARD',
  id: nextBoardId++,
  text
})