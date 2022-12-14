const axios = require('axios').default;
const baseURL = process.env.REACT_APP_BASE_URL;

export async function postCards(boardId,columnId, title) {
  const newTitle = title ? title : "New Card";
  const response = await axios
    .post(`${baseURL}/boards/${boardId}/columns/${columnId}/cards`, {
      title: newTitle,
    })
    .catch(function (error) {
      console.log(error);
    });
  return response.data;
}

export async function putCard(boardId,columnId,cardId,title) {
    const response = await axios
      .put(`${baseURL}/boards/${boardId}/columns/${columnId}/cards/${cardId}`, {
        title: title,
      })
      .catch(function (error) {
        console.log(error);
      });
    return response.data;
}

export async function deleteCard(boardId, columnId, cardId) {
    const response = await axios.delete(`${baseURL}/boards/${boardId}/columns/${columnId}/cards/${cardId}`, {
    }).catch(function (error) {
        console.log(error);
    });
    return response.data;
}

export async function getCard(boardId, columnId, cardId) {
  const response = await axios.get(`${baseURL}/boards/${boardId}/columns/${columnId}/cards/${cardId}`, {
  }).catch(function (error) {
      console.log(error);
  });
  return response.data;
}