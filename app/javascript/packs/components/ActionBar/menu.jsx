import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = ({ isUser, logOut }) => {
  return (
    <Nav className="mr-auto">
      {isUser ? (
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
      ) : (
        <>
          <Link className="nav-link" to="/log-in">
            Log In
          </Link>
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </>
      )}
    </Nav>
  );
};

export default Menu;
