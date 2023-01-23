import React, { useState, useEffect } from 'react';

const AuthForm = ({
  buttonText,
  formName,
  onLogin,
  onRegister
}) => {
  useEffect(() => {
    setState({
      email: '',
      password: ''
    })
  }, []);

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleChangeUserEmail = (e) => {
    setState({
      ...state,
      email: e.target.value
    })
  };

  const handleChangePassword = (e) => {
    setState({
      ...state,
      password: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (!email || !password) return;
    if (onLogin) onLogin(email, password);
    if (onRegister) onRegister(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${formName}__form`}>
      <fieldset className="form__content form__content_type_auth">
        <label className="form__field">
          <input
            className="form__input form__input_type_auth"
            name="email"
            type="text"
            value={state.email}
            onChange={handleChangeUserEmail}
            placeholder="Email"
            required
          />
          {/* <span className="form__input-error name-input-error"></span> */}
        </label>
        <label className="form__field">
          <input
            className="form__input form__input_type_auth"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChangePassword}
            placeholder="Пароль"
            required
          />
          {/* <span className="form__input-error job-input-error"></span> */}
        </label>
      </fieldset>
      <button type="submit" className="btn btn_type_save btn_type_auth">{buttonText}</button>
    </form>
  );
};

export default AuthForm;