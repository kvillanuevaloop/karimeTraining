const axios = require('axios').default;
const baseURL = 'https://62fed980a85c52ee483d6943.mockapi.io/api/v1';

export async function getColumn(boardId) {
    const response = await axios.get(`${baseURL}/boards/${boardId}/columns`, {
    }).catch(function (error) {
        console.log(error);
    });
    return response.data;
}

export async function postColumns(board,title) {
    const response = await axios
      .post(`${baseURL}/boards/${board}/columns`, {
        title: title,
      })
      .catch(function (error) {
        console.log(error);
      });
    return response.data;
}

export async function putColumn(boardId,columnId,title) {
  const response = await axios
    .put(`${baseURL}/boards/${boardId}/columns/${columnId}`, {
      title: title,
    })
    .catch(function (error) {
      console.log(error);
    });
  return response.data;
}

export async function deleteColumn(boardId,columnId) {
    const response = await axios.delete(`${baseURL}/boards/${boardId}/columns/${columnId}`, {
    }).catch(function (error) {
        console.log(error);
    });
    return response.data;
}
