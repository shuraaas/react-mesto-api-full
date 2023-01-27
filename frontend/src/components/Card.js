import { React, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({
  _id,
  name,
  link,
  owner,
  likes,
  onCardClick,
  onCardLike,
  onDeleteCardClick
}) => {
  const currentUser = useContext(CurrentUserContext);
  const ownerId = owner._id || owner;
  // console.log(owner);

  const isOwn = ownerId === currentUser._id;
  const isLiked = likes.some(item => item._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `${isOwn ? 'btn btn_type_delete' : 'btn_hidden'}`
  );
  const cardLikeButtonClassName = (
    `${isLiked ? 'btn btn_type_like btn_type_like-active' : 'btn btn_type_like'}`
  );

  const handleClick = () => {
    onCardClick(name, link);
  };

  const handleLikeClick = () => {
    onCardLike({ _id, likes });
  };

  const handleDeleteClick = () => {
    onDeleteCardClick(_id);
  };

  return (
    <li className="card">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <img className="card__img" src={link} alt={name} onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__place">{name}</h2>
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
        <p className="card__like-counter">
          {likes.length}
        </p>
      </div>
    </li>
  );
};

export default Card;