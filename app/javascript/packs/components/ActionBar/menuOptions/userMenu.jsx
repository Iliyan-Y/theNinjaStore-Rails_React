import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserMenu = ({ isAdmin, isUser, logOut }) => {
  if (isUser && !isAdmin)
    return (
      <NavDropdown title="Menu" id="basic-nav-dropdown">
        <Link className="dropdown-item" to="/user/orders">
          My Orders
        </Link>
        <Link className="dropdown-item" to="/" onClick={() => logOut()}>
          Log Out
        </Link>
      </NavDropdown>
    );
  return '';
};

export default UserMenu;
