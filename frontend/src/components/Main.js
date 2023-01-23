import React, { useContext } from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onDeleteCardClick,
  cards
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__author">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя." />
            <button className="btn btn_type_edit-avatar" onClick={onEditAvatar} type="button"></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="btn btn_type_edit" onClick={onEditProfile} type="button"></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button className="btn btn_type_add" onClick={onAddPlace} type="button"></button>
      </section>

      {cards ? (
        <section className="cards">
          <ul className="cards__list">
            {cards.map(card => (
              <Card
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                onDeleteCardClick={onDeleteCardClick}
                {...card}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
};

export default Main;