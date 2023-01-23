import React from "react";

const PopupWithForm = ({ title, name, isOpen, onClose, onSubmit, buttonText, children }) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="btn btn_type_close" type="button" onClick={onClose}></button>
        <form className={`form form_type_${name}`} name={name} onSubmit={onSubmit} method="post" action="/">
          <h2 className="popup__description">{title}</h2>
          {children}
          <button className="btn btn_type_save" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;