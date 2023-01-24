import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

const Register = ({ onRegister }) => {
  return (
    <section className="auth">
      <h2 className="auth__description">Регистрация</h2>
      <AuthForm
        buttonText="Зарегистрироваться"
        formName="register"
        onRegister={onRegister}
      />
      <div className="auth__signin">
        <p className='auth__login'>Уже зарегистрированы?</p>
        <Link to="/signin" className="auth__login-link">Войти</Link>
      </div>
    </section>
  );
};

export default Register;