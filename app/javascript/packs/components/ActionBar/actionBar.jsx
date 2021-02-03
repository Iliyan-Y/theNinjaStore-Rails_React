import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import BasketShortcut from '../Basket/basketShortcut';
import { checkForUser } from '../../helpers/checkForUser';
//bootstrap
import { Navbar } from 'react-bootstrap';
import NavBrand from './navBrand';
import Menu from './menu';
import { Link } from 'react-router-dom';

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
    <Navbar bg="light" expand="lg" sticky="top">
      <NavBrand />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <BasketShortcut />
      <Navbar.Collapse id="basic-navbar-nav">
        <Menu isAdmin={isUser.admin} isUser={isUser.user} logOut={logOut} />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ActionBar;
