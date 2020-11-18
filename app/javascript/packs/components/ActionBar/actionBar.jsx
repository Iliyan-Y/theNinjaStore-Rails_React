import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import BasketShortcut from '../Basket/basketShortcut';
import axios from 'axios';

const ActionBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  let [isUser, setIsUser] = useState(false);

  useEffect(() => {
    console.log(isUser);
  }, [cookies]);

  return (
    <div>
      <Link to="/">Home</Link> | <BasketShortcut />
      {cookies.user_token == undefined ? (
        <div>
          <Link to="/log-in">Log In</Link>
        </div>
      ) : (
        <div>
          <Link to="/">Sign Up</Link> |
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
