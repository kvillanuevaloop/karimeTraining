const axios = require('axios').default;
const baseURL = process.env.REACT_APP_BASE_URL;

export async function getBoards() {
    const response = await axios.get(`${baseURL}/boards`, {
    }).catch(function (error) {
        console.log(error);
    });

    return response.data;
}

export async function postBoards(title) {
    const response = await axios
      .post(`${baseURL}/boards`, {
        title: title,
      })
      .catch(function (error) {
        console.log(error);
      });
    return response.data;
}

export async function deleteBoard(boardId) {
    const response = await axios.delete(`${baseURL}/boards/${boardId}`, {
    }).catch(function (error) {
        console.log(error);
    });
    return response.data;
}