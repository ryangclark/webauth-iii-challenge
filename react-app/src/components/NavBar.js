import './NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <nav>
      <h2>React App Thing</h2>
      <div className="nav-links">
        {props.currentUser.isAuthenticated || localStorage.getItem('token') ? (
          <>
            <p className="greeting">Hello, {props.currentUser.username}!</p>
            <Link to={'/users'}>Users List</Link>
            <p onClick={props.logout()}>Log Out</p>
          </>
        ) : (
          <>
            <Link to={'/'}>Register</Link>
            <Link to={'/'}>Log In</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
