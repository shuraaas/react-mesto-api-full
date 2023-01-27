import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import СonfirmationPopup from './СonfirmationPopup';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './NavBar';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupData, setIsInfoTooltipPopupData] = useState({
    isOpen: false,
    title: '',
    status: '',
  });

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [currentCard, setCurrentCard] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      const promiseUserInfo = api.getUserInfo();
      const promiseInitialCards = api.getInitialCards();

      Promise.all([promiseUserInfo, promiseInitialCards])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards.reverse());
        })
        .catch(err => console.error(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) tokenCheck(token);
  }, [history]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (cardId) => {
    setCurrentCard(cardId);
    setIsDeleteCardPopupOpen(true);
  };

  const handleCardClick = (name, link) => {
    setSelectedCard({ name, link });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupData({
      ...isInfoTooltipPopupData,
      isOpen: false,
    });
    setSelectedCard(null);
  };

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  };

  const handleUpdateAvatar = (avatar) => {
    api.changeAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  };

  const handleAddCardSubmit = (data) => {
    api.setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  };

  const handleCardLike = ({ _id, likes }) => {
    const isLiked = likes.some(item => item._id === currentUser._id);

    api.likeCard(_id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === _id ? newCard : c));
      })
      .catch(err => console.error(err));
  };

  const handleCardDelete = () => {
    api.deleteCard(currentCard)
      .then(() => {
        setCards((state) => state.filter(item => item._id !== currentCard));
        setIsDeleteCardPopupOpen(false);
      })
      .catch(err => console.error(err));
  };

  const handleRegister = (email, password) => {
    return auth.register(email, password)
      .then(() => {
        setIsInfoTooltipPopupData({
          isOpen: true,
          title: 'Вы успешно зарегистрировались!',
          status: true
        });
        history.push('/signin');
      })
      .catch(err => {
        console.log(err);
        setIsInfoTooltipPopupData({
          isOpen: true,
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
          status: false
        });
      });
  };

  const handleLogin = (email, password) => {
    return auth.authorize(email, password)
      .then((data) => {
        if (!data.token) throw new Error('Missing token');
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/cards');
      })
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  const tokenCheck = (token) => {
    auth.getContent(token)
      .then((data) => {
        setLoggedIn(true);
        setUserEmail(data.email);
        history.push("/cards");
      })
      .catch(err => console.error(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header>
            <NavBar
              loggedIn={loggedIn}
              userEmail={userEmail}
              onLogout={handleLogout}
            />
          </Header>
          <Switch>
            <ProtectedRoute path="/cards" loggedIn={loggedIn}>
              <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onDeleteCardClick={handleDeleteCardClick}
                  cards={cards}
                />
                <Footer />
            </ProtectedRoute>
            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/signin">
              <Login onLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
        </div>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
        />
        <СonfirmationPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <InfoTooltip
          data={isInfoTooltipPopupData}
          name="info-tooltip"
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
