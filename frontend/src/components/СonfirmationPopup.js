import React from "react";
import PopupWithForm from "./PopupWithForm";

const СonfirmationPopup = ({ isOpen, onClose, onCardDelete }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Да"
    />
  );
};

export default СonfirmationPopup;