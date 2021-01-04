import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBrand = () => {
  return (
    <Nav className="mx-auto">
      <Link
        data-testid="logo-1"
        style={{ fontFamily: 'Apple Chancery, cursive' }}
        className="navbar-brand"
        to="/"
      >
        The Ninja Store
      </Link>
    </Nav>
  );
};

export default NavBrand;
