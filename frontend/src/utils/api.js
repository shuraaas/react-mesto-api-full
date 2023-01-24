class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  _request = (url, options) => {
    return fetch(url, options).then(this._checkResult);
  };

  _getToken = () => {
    const token = localStorage.getItem('jwt');

    return {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  getUserInfo = () => {
    return this._request(`${this._url}users/me`, {
      headers: this._getToken(),
    });
  };

  setUserInfo = (userData) => {
    return this._request(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._getToken(),
      body: JSON.stringify({
        name: userData.name,
        about: userData.job
      })
    });
  };

  getInitialCards = () => {
    return this._request(`${this._url}cards`, {
      headers: this._getToken(),
    });
  };

  setNewCard = ({ name, link }) => {
    return this._request(`${this._url}cards`, {
      method: 'POST',
      headers: this._getToken(),
      body: JSON.stringify({
        name,
        link
      })
    });
  };

  deleteCard = (cardId) => {
    return this._request(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getToken(),
    });
  };

  likeCard = (cardId, status) => {
    return this._request(`${this._url}cards/${cardId}/likes`, {
      method: status ? 'DELETE' : 'PUT',
      headers: this._getToken(),
    });
  };

  changeAvatar = (data) => {
    return this._request(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._getToken(),
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  };
};

const apiConfig = {
  // baseUrl: 'http://localhost:3000/',
  baseUrl: 'https://api.shuraaas.nomoredomains.rocks/',
};

const api = new Api(apiConfig);

export default api;