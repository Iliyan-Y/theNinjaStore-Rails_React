import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminMenu = ({ isAdmin, logOut }) => {
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
  return '';
};

export default AdminMenu;
