import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import BasketShortcut from '../Basket/basketShortcut';

const ActionBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <div>
      <Link to="/">Home</Link> | <BasketShortcut />
      {cookies.user_token == undefined ? (
        <div>
          <Link to="/register">Sign Up</Link> | <Link to="/log-in">Log In</Link>
        </div>
      ) : (
        <div>
          <Link to="/new/product">New Product</Link> |
          <a href="/" onClick={() => removeCookie('user_token')}>
            Log Out
          </a>
        </div>
      )}
    </div>
  );
};

export default ActionBar;
