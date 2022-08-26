import {getBoards, postBoards, deleteBoard} from './boardResource';
import {getColumn, postColumns, deleteColumn, putColumn} from './columnAxios';
import {postCards, deleteCard, putCard, getCard} from './cardAxios';

const apiResources = {
  BOARDS: {
    post: async (title) => await postBoards(title),
    get: async () => await getBoards(),
    delete: async (boardId) => await deleteBoard(boardId),
  },
  COLUMNS: {
    put: async (boardId,columnId,title) => await putColumn(boardId,columnId,title),
    post: async (boardId,title) => await postColumns(boardId,title),
    get: async (boardId) => await getColumn(boardId),
    delete: async (boardId,columnId) => await deleteColumn(boardId,columnId),
  },
  CARDS: {
    get: async (boardId, columnId, cardId) => await getCard(boardId, columnId, cardId),
    put: async (boardId,columnId,cardId,title) => await putCard(boardId,columnId,cardId,title),
    post: async (boardId,columnId) => await postCards(boardId,columnId),
    delete: async (boardId, columnId, cardId) => await deleteCard(boardId, columnId, cardId),
  }
};

export default apiResources;



 