import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import BasketShortcut from '../Basket/basketShortcut';
import { checkForUser } from '../../helpers/checkForuser';
//bootstrap
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

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
    <Navbar bg="light" expand="lg">
      <Link className="navbar-brand" to="/">
        Store
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <BasketShortcut />
          {isUser ? (
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <Link className="dropdown-item" href="/admin/all-orders">
                Orders
              </Link>
              <Link className="dropdown-item" to="/new/product">
                New Product
              </Link>
              <NavDropdown.Divider />
              <Link className="dropdown-item" href="/" onClick={() => logOut()}>
                Log Out
              </Link>
            </NavDropdown>
          ) : (
            <Link className="nav-link" to="/log-in">
              Log In
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ActionBar;
