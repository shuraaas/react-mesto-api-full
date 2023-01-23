class Api {
  constructor({ baseUrl, tokenId }) {
    this._url = baseUrl;
    this._tokenId = tokenId;
    this._headers = {
      authorization: this._tokenId,
      'Content-Type': 'application/json'
    };
  }

  // проверяем результат запроса
  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  // универсальный запрос
  _request = (url, options) => {
    return fetch(url, options).then(this._checkResult);
  };

  // запрашиваем инфу о пользователе с сервера (аватар, имя, описание)
  getUserInfo = () => {
    return this._request(`${this._url}users/me`, {
      headers: this._headers
    });
  };

  //  сохраняем отредактированные данные профиля на сервере
  setUserInfo = (userData) => {
    return this._request(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.job
      })
    });
  };

  // запрашиваем начальные карточки с сервера
  getInitialCards = () => {
    return this._request(`${this._url}cards`, {
        headers: this._headers
      });
  };

  // загружаем новую карточку на сервер
  setNewCard = ({ name, link }) => {
    return this._request(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    });
  };

  deleteCard = (cardId) => {
    return this._request(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  };

  // ставим лайк
  likeCard = (cardId, status) => {
    return this._request(`${this._url}cards/${cardId}/likes`, {
      method: status ? 'DELETE' : 'PUT',
      headers: this._headers
    });
  };

  // загружаем новый аватар на сервер
  changeAvatar = (data) => {
    return this._request(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  };
};

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48/',
  tokenId: '1a0fcad2-374c-4a16-bc60-ad5ac7325d61'
};

const api = new Api(apiConfig);

export default api;