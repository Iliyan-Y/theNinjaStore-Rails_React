import React from 'react';
import { Nav } from 'react-bootstrap';
import AdminMenu from './menuOptions/adminMenu';
import NoUser from './menuOptions/noUser';
import UserMenu from './menuOptions/userMenu';

const Menu = ({ isAdmin, isUser, logOut }) => {
  return (
    <Nav className="ml-auto">
      <AdminMenu isAdmin={isAdmin} logOut={logOut} />
      <UserMenu isUser={isUser} isAdmin={isAdmin} logOut={logOut} />
      <NoUser isUser={isUser} />
    </Nav>
  );
};

export default Menu;
