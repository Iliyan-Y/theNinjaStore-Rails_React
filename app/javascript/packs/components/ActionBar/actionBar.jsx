import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import BasketShortcut from '../Basket/basketShortcut';
import { checkForUser } from '../../helpers/checkForuser';

const ActionBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  let [isUser, setIsUser] = useState(false);

  useEffect(() => {
    let token = cookies.user_token;
    checkForUser(token, setIsUser);
  }, [cookies.user_token]);

  let logOut = () => {
    removeCookie('user_token');
    setIsUser(false);
  };

  return (
    <div>
      <Link to="/">Home</Link> | <BasketShortcut />
      {isUser ? (
        <div>
          <Link to="/new/product">New Product</Link> |
          <a href="/" onClick={() => logOut()}>
            Log Out
          </a>
        </div>
      ) : (
        <div>
          <Link to="/log-in">Log In</Link>
        </div>
      )}
    </div>
  );
};

export default ActionBar;
