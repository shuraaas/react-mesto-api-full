import React from 'react';
import AuthForm from './AuthForm';

const Login = ({ onLogin }) => {
  return (
    <section className="auth">
      <h2 className="auth__description">Вход</h2>
      <AuthForm
        buttonText="Войти"
        formName="login"
        onLogin={onLogin}
      />
    </section>
  );
};

export default Login;