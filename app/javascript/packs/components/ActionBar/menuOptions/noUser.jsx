import React from 'react';
import { Link } from 'react-router-dom';

const NoUser = ({ isUser }) => {
  if (!isUser)
    return (
      <>
        <Link className="nav-link" to="/log-in">
          Log In
        </Link>
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </>
    );
  return '';
};

export default NoUser;
