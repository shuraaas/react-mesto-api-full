import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
    inputRef.current.value = '';
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__content">
        <label className="form__field">
          <input
            ref={inputRef}
            className="form__input form__input_type_avatar"
            name="avatar"
            id="avatar-input"
            type="url"
            placeholder="Ссылка на аватар"
            required
          />
          <span className="form__input-error avatar-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;