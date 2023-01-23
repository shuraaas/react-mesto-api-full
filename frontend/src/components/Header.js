import React from 'react';
import logoPath from '../images/header-logo.svg';

const Header = ({ children }) => {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотоп сайта место." />
      {children}
    </header>
  );
};

export default Header;