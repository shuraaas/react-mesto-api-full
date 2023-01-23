import React, { useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function NavBar ({ loggedIn, userEmail, onLogout }) {
  const routeMatch = useRouteMatch('/sign-in');
  const navbar = useRef(null);
  const burger = useRef(null);

  const handleHumClick = () => {
    const isOpen = navbar.current.style;

    if (isOpen.display === 'block') {
      burger.current.classList.remove('navbar__hum-item_active');
      isOpen.display = 'none';
    } else {
      burger.current.classList.add('navbar__hum-item_active');
      isOpen.display = 'block';
    }
  }

  return (
    <>
      <div className="navbar" ref={navbar}>
        <ul className="navbar__nav">
          {(routeMatch && !loggedIn) && <Link className="navbar__link" to="/sign-up">Регистрация</Link>}
          {(!routeMatch && !loggedIn) && <Link className="navbar__link" to="/sign-in">Войти</Link>}
          {loggedIn && <li>{userEmail}</li>}
          {loggedIn && <li><button onClick={onLogout} className="btn navbar__link">Выйти</button></li>}
        </ul>
      </div>
      {loggedIn && (
        <button className="navbar__hum" type="button" onClick={handleHumClick}>
          <span className="navbar__hum-item" ref={burger}>Menu</span>
        </button>
      )}
    </>
  )
}

export default NavBar;