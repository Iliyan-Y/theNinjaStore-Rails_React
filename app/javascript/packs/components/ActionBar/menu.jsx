import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NoUser from './menuOptions/noUser';

const Menu = ({ isAdmin, isUser, logOut }) => {
  let adminPanel = () => {
    if (isAdmin)
      return (
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <Link className="dropdown-item" to="/admin/all-orders">
            Orders
          </Link>
          <Link className="dropdown-item" to="/new/product">
            New Product
          </Link>
          <NavDropdown.Divider />
          <Link className="dropdown-item" to="/" onClick={() => logOut()}>
            Log Out
          </Link>
        </NavDropdown>
      );
  };

  let userPanel = () => {
    if (isUser && !isAdmin)
      return (
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <Link className="dropdown-item" to="/" onClick={() => logOut()}>
            Log Out
          </Link>
        </NavDropdown>
      );
  };

  return (
    <Nav className="mr-auto">
      {adminPanel()}
      {userPanel()}
      <NoUser isUser={isUser} />
    </Nav>
  );
};

export default Menu;
