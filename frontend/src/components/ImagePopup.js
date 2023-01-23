import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={card
      ? `popup popup_type_zoom-img popup_opened`
      : `popup popup_type_zoom-img`
    }>
      {card ? (
        <div className="popup__img-container">
          <button className="btn btn_type_close" type="button" onClick={onClose}></button>
          <img className="popup__img" src={card.link} alt={card.name} />
          <p className="popup__img-name">{card.name}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ImagePopup;