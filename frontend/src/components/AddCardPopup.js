import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddCardPopup = ({ isOpen, onClose, onAddCard }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard({ name, link });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__content">
        <label className="form__field">
          <input
            className="form__input form__input_type_place-name"
            name="place-name"
            value={name}
            id="place-name-input"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            onChange={handleNameChange}
            required
          />
          <span className="form__input-error place-name-input-error"></span>
        </label>
        <label className="form__field">
          <input
            className="form__input form__input_type_url"
            name="url"
            value={link}
            id="url-input"
            type="url"
            placeholder="Ссылка на картинку"
            onChange={handleLinkChange}
            required
          />
          <span className="form__input-error url-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddCardPopup;